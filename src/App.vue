<template>
    <md-content id="root" :md-theme="selectedTheme">
        <md-toolbar md-elevation="3">
            <h3 class="md-title">{{ week }}</h3>
        </md-toolbar>
        <template v-if="isWeekday">
            <panel v-if="isCacheVaild" :list="today_meal" :open.sync="time" />
            <section v-else-if="isBeforeTenOclock" class="network">
                <vue-svg-filler
                    path="SVG/tenOclock.svg"
                    :fill="svgColor"
                    width="130px"
                    height="130px"
                />
                <p>10시 이후에 새로운 학식 데이터가 업로드 됩니다.</p>
            </section>
            <section v-else="!isCacheVaild" class="network">
                <vue-svg-filler
                    path="SVG/networkDisable.svg"
                    :fill="svgColor"
                    width="130px"
                    height="130px"
                />
                <p>네트워크 연결이 필요합니다.</p>
            </section>
        </template>
        <section v-else class="weekend">
            <vue-svg-filler
                path="SVG/NpVacation.svg"
                :fill="svgColor"
                width="130px"
                height="130px"
            />
            <p>주말</p>
        </section>
        <dialog-custom v-on:@switch="swithTheme" />
        <bottom-nav :time.sync="time" :theme="setBottomTheme" />
    </md-content>
</template>

<script>
import request from './api.js'
import DialogCustom from './components/DialogCustom.vue'
import Panel from './components/Panel.vue'
import BottomNav from './components/BottomNav.vue'
import VueSvgFiller from 'vue-svg-filler'

const weekDict = {
    0: '일요일',
    1: '월요일',
    2: '화요일',
    3: '수요일',
    4: '목요일',
    5: '금요일',
    6: '토요일'
}

const THEMES = ['default', 'default-dark']

// const TIME = { 점심: [true, false], 저녁: [false, true] }

export default {
    name: 'App',
    components: {
        DialogCustom,
        Panel,
        BottomNav,
        VueSvgFiller
    },
    data: () => ({
        cache_keys: [],
        isBeforeTenOclock: false,
        isWeekday: true,
        week: '월요일',
        time: '점심',
        // panel: [true, false],
        // weekly_meal: {}, //TODO
        today_meal: {},
        selectedTheme: 'default'
    }),
    computed: {
        isCacheVaild() {
            const api_v = `api_${Math.floor(new Date().getDate() / 7)}`
            return this.cache_keys.findIndex(itm => itm == api_v) > -1
        },
        setBottomTheme() {
            return this.selectedTheme === 'default'
                ? 'lite-bottom-bar'
                : 'dark-bottom-bar'
        },
        svgColor() {
            return this.selectedTheme === THEMES[0] ? '#000000' : '#F1F1F1'
        }
    },
    created() {
        caches.keys().then(keys => (this.cache_keys = keys))

        const date = new Date()
        const weekday = date.getDay()
        const Hour = date.getHours()

        if (weekday === 1) this.isBeforeTenOclock = 10 > Hour

        this.week = weekDict[weekday]

        if (weekday === 0 || weekday === 6) {
            this.isWeekday = false
            return
        }

        this.time = Hour < 15 ? '점심' : '저녁'

        request().then(data => {
            // this.weekly_meals = data
            this.today_meal = data[weekday - 1]
        })
    },
    methods: {
        swithTheme(val) {
            this.selectedTheme = val
        }
    }
    // watch: {
    //     time(newV) {
    //         this.panel = TIME[newV]
    //     }
    // }
}
</script>

<style lang="scss" scoped>
#root.md-theme-default-dark {
    background-color: rgb(24, 26, 27);
}

#root {
    display: flex;
    height: 100vh;
    flex-direction: column;

    .md-toolbar {
        justify-content: center;
    }

    .weekend {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: x-large;
        height: 100%;
		width: 100%;
    }
}
</style>


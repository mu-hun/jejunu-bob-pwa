<template>
    <md-content id="root" :md-theme="selectedTheme">
        <md-toolbar md-elevation="3">
            <h3 class="md-title">{{ week }}</h3>
        </md-toolbar>
        <template v-if="isWeekday">
            <panel v-if="isCacheVaild" :list="today_meal" :open.sync="time" />
            <div v-else-if="isBeforeTenOclock">10시 이후에 새로운 학식 데이터가 업로드 됩니다.</div>
            <div v-else="!isCacheVaild">네트워크 연결이 필요합니다.</div>
        </template>
        <template v-else class="weekend">
            <NpVacation />주말
        </template>
        <dialog-custom v-on:@switch="swithTheme" />
        <bottom-nav
            :time.sync="time"
            :theme="selectedTheme === 'default'? 'lite-bottom-bar': 'dark-bottom-bar'"
        />
    </md-content>
</template>

<script>
import request from './api.js'
import DialogCustom from './components/DialogCustom.vue'
import Panel from './components/Panel.vue'
import BottomNav from './components/BottomNav.vue'
import NpVacation from './SVG/npVacation.svg'

const weekDict = {
    0: '일요일',
    1: '월요일',
    2: '화요일',
    3: '수요일',
    4: '목요일',
    5: '금요일',
    6: '토요일'
}

export default {
    name: 'App',
    components: {
        DialogCustom,
        Panel,
        BottomNav,
        NpVacation
    },
    data: () => ({
        cache_keys: [],
        isBeforeTenOclock: false,
        isWeekday: true,
        week: '월요일',
        time: '점심',
        timeKey: { 점심: [true, false], 저녁: [false, true] },
        panel: [true, false],
        showDialog: false,
        // weekly_meal: {}, //TODO
        today_meal: {},
        selectedTheme: 'default'
    }),
    computed: {
        isCacheVaild() {
            const api_v = `api_${Math.floor(new Date().getDate() / 7)}`
            return this.cache_keys.findIndex(itm => itm == api_v) > -1
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
    },
    watch: {
        time(newV) {
            this.panel = this.timeKey[newV]
        }
    }
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


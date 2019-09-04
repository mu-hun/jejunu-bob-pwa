<template>
    <md-content :md-theme="selectedTheme">
        <md-toolbar md-elevation="3">
            <h3 class="md-title">{{ week }}</h3>
        </md-toolbar>
        <template v-if="isWeekday">
            <panel v-if="isCacheVaild" :list="today_meal" />
            <section v-else-if="isBeforeTenOclock" class="network">
                <svg-wrapper name="tenOclock" />
                <p>10시 이후에 새로운 학식 데이터가 업로드 됩니다.</p>
            </section>
            <section v-else="!isCacheVaild" class="network">
                <svg-wrapper name="networkDisable" />
                <p>네트워크 연결이 필요합니다.</p>
            </section>
        </template>
        <section v-else class="weekend">
            <svg-wrapper name="NpVacation" />
            <p>주말</p>
        </section>
        <dialog-custom />
        <bottom-nav />
    </md-content>
</template>

<script>
import request from './api.js'
import { mapState, mapGetters, mapActions } from 'vuex'

import DialogCustom from './components/DialogCustom.vue'
import Panel from './components/Panel.vue'
import BottomNav from './components/BottomNav.vue'
import SvgWrapper from './components/SvgWrapper.vue'

const weekDict = {
    0: '일요일',
    1: '월요일',
    2: '화요일',
    3: '수요일',
    4: '목요일',
    5: '금요일',
    6: '토요일'
}

// const TIME = { 점심: [true, false], 저녁: [false, true] }

export default {
    name: 'App',
    components: {
        DialogCustom,
        Panel,
        BottomNav,
        SvgWrapper
    },
    data: () => ({
        cache_keys: [],
        isBeforeTenOclock: false,
        isWeekday: true,
        week: '월요일',
        // panel: [true, false],
        // weekly_meal: {}, //TODO
        today_meal: {}
    }),
    computed: {
        ...mapState(['time', 'selectedTheme']),
        ...mapGetters(['setBottomTheme', 'setSvgColor'])
    },
    methods: {
        ...mapActions(['CHANGE_TIME']),
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

        this.CHANGE_TIME(Hour < 15 ? '점심' : '저녁')

        request().then(data => {
            // this.weekly_meals = data
            this.today_meal = data[weekday - 1]
        })
    }
}
</script>

<style lang="scss" scoped>
@mixin flex-column() {
    display: flex;
    flex-direction: column;
}

.md-content.md-theme-dark {
    background-color: rgb(24, 26, 27);
}

.md-content {
    @include flex-column();
    height: 100vh;
    justify-content: flex-start;

    .md-toolbar {
        justify-content: center;
    }

    .network,
    .weekend {
        @include flex-column();
        justify-content: center;
        align-items: center;
        font-size: x-large;
        height: 100%;
        word-break: keep-all;
        p {
            margin-top: 12px;
        }
    }
}
</style>


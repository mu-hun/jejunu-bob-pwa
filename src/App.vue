<template>
    <div id="root">
        <md-toolbar md-elevation="3">
            <h3 class="md-title">{{ week }}</h3>
        </md-toolbar>
        <template v-if="isWeekday">
            <panel v-if="isCacheVaild" :list="today_meal" :open.sync="time" />
            <div v-else-if="isBeforeTenOclock">10시 이후에 새로운 학식 데이터가 업로드 됩니다.</div>
            <div v-else="!isCacheVaild">네트워크 연결이 필요합니다.</div>
        </template>
        <div v-else class="weekend">
            <NpVacation />주말
        </div>
        <bottom-nav :time.sync="time" />
    </div>
</template>

<script>
import request from './api.js'
// import License from './components/License'
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
        // License,
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
        today_meal: {}
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
    watch: {
        time(newV) {
            this.panel = this.timeKey[newV]
        }
    }
}
</script>

<style scoped>
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

.license {
    display: flex;
    min-width: 100vw;
    justify-content: center;
    margin-bottom: 28px;
}
</style>


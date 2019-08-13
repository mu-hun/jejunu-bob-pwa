<template>
    <div id="root">
        <md-toolbar md-elevation="3">
            <h3 class="md-title">{{ week }}</h3>
        </md-toolbar>
        <!-- TODO -->
        <panel v-if="isWeekday" :list="today_meal" />
        <div v-else class="weekend">
            <NpVacation />주말
        </div>
        <!-- <div class="license">
      <license />
        </div>-->
        <!-- <bottom-nav :time.sync="time" /> -->
    </div>
</template>

<script>
import request from './api.js'
// import License from './components/License'
import Panel from './components/Panel.vue'
// import BottomNav from './components/BottomNav'
import NpVacation from './SVG/npVacation.svg'

export default {
    name: 'App',
    components: {
        // License,
        Panel,
        // BottomNav,
        NpVacation
    },
    data: () => ({
        isWeekday: true,
        weekDict: {
            0: '일요일',
            1: '월요일',
            2: '화요일',
            3: '수요일',
            4: '목요일',
            5: '금요일',
            6: '토요일'
        },
        week: '월요일',
        time: '점심',
        timeKey: { 점심: [true, false], 저녁: [false, true] },
        panel: [true, false],
        // weekly_meal: {}, //TODO
        today_meal: {}
    }),
    created() {
        const date = new Date()
        const weekday = date.getDay()
        this.week = this.weekDict[weekday]
        if (weekday === 0 || weekday === 6) {
            this.isWeekday = false
            return
        }
        this.time = date.getHours() < 15 ? '점심' : '저녁'
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
.center {
    margin: 0 auto;
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


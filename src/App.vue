<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="center">{{ week }}</v-toolbar-title>
	  <open-source-license/>
    </v-toolbar>
    <v-content>
      <v-expansion-panel v-if="isWeekday" v-model="panel" expand>
        <v-expansion-panel-content v-for="(value, time) in today" :key="time">
          <template v-slot:header>
            <div v-text="time" />
          </template>
          <v-card>
            <v-list>
              <v-list-tile v-for="(menus, type, index) in value" :key="`${type}_list-tile`">
                <v-list-tile-content>
                  <v-list-tile-title>{{menus | join}}</v-list-tile-title>
                  <v-list-tile-sub-title v-text="type" />
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index < calcEnd(value)" :key="`${type}_divider`" />
            </v-list>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <div v-else class="weekend">
        <v-icon color="black darken-2" x-large>weekend</v-icon>주말
      </div>
    </v-content>
    <v-bottom-nav :active.sync="time" :value="true" absolute color="transparent">
      <v-btn color="teal" flat value="점심">
        <span>점심</span>
        <v-icon>fastfood</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="저녁">
        <span>저녁</span>
        <v-icon>restaurant</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import { request } from './api.js'
export default {
    name: 'App',
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
        time: '',
        timeKey: { 점심: [true, false], 저녁: [false, true] },
        panel: [true, false],
        total: {},
        today: {}
    }),
    created() {
		const weekday = new Date().getDay()
		this.week = this.weekDict[weekday]
        if (weekday === 0 || weekday === 6) {
            this.isWeekday = false
            return
		}
        request().then(data => {
            this.total = data
            this.isWeekday = true
            this.today = this.total[weekday - 1]
        })
    },
    watch: {
        time(newV) {
            this.panel = this.timeKey[newV]
        }
    },
    filters: {
        join: arr => arr.join(' ').replace(/\(.+\)/, '')
    },
    methods: {
        calcEnd: obj => Object.keys(obj).length - 1
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
    text-align: center;
    height: 200px;
}

.weekend i {
    font-size: 120px !important;
}

/* .v-bottom-nav {
    justify-content: space-between;
} */
</style>


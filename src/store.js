import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const TIME_LIST = ['점심', '저녁']
const THEME_LIST = ['default', 'default-dark']

const WRONG_ARGU = newV => Error('잘못된 인자가 들어왔습니다:', newV)

export default new Vuex.Store({
    state: {
        time: '점심',
        selectedTheme: THEME_LIST[0]
    },
    getters: {
        isDefaultSelected: ({ selectedTheme }) =>
            selectedTheme === THEME_LIST[0],
        setBottomTheme: (_, { isDefaultSelected }) =>
            isDefaultSelected ? 'lite-bottom-bar' : 'dark-bottom-bar',
        setSvgColor: (_, { isDefaultSelected }) =>
            isDefaultSelected ? '#000000' : '#F1F1F1',
        time: ({ time }) => time
    },
    mutations: {
        TIME_SELECT(state, newV) {
            if (!TIME_LIST.includes(newV)) throw WRONG_ARGU(newV)
            console.log(newV)
            state.time = newV
        },
        THEME_SELECT(state, newV) {
            if (!THEME_LIST.includes(newV)) throw WRONG_ARGU(newV)
            state.selectedTheme = newV
        }
    },
    actions: {
        CHANGE_TIME({ commit }, data) {
            commit('TIME_SELECT', data)
        },
        CHANGE_THEME({ commit }, bool) {
            commit('THEME_SELECT', bool ? THEME_LIST[0] : THEME_LIST[1])
        }
    }
})

<template>
    <md-bottom-bar :md-active-item="time" v-on:md-changed="CHANGE_TIME" :md-theme="setBottomTheme">
        <md-bottom-bar-item id="점심" md-label="점심" md-icon="fastfood" />
        <md-bottom-bar-item id="저녁" md-label="저녁" md-icon="restaurant" />
    </md-bottom-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'BottomNav',
    computed: {
        ...mapGetters(['time', 'setBottomTheme'])
    },
    methods: mapActions(['CHANGE_TIME'])
}
</script>

<style lang="scss">
/* hack: scoped 스타일링이 안됨 */
.md-bottom-bar {
    margin-top: auto;
    > div {
        justify-content: space-around;
    }
}
</style>

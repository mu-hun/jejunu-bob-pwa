<template>
    <md-bottom-bar :md-active-item="time" v-on:md-changed="emit" :md-theme="theme">
        <md-bottom-bar-item id="점심" md-label="점심" md-icon="fastfood" />
        <md-bottom-bar-item id="저녁" md-label="저녁" md-icon="restaurant" />
    </md-bottom-bar>
</template>

<script>
export default {
    name: 'BottomNav',
    props: ['time', 'theme'],
    methods: {
        emit(value) {
            this.$emit('update:time', value)
        }
    }
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

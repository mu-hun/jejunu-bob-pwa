<template>
    <md-bottom-bar :md-active-item="time" v-on:md-changed="emit">
        <md-bottom-bar-item id="점심" md-label="점심" md-icon="fastfood" />
        <md-bottom-bar-item id="저녁" md-label="저녁" md-icon="pages" />
    </md-bottom-bar>
</template>

<script>
export default {
    name: 'BottomNav',
    props: ['time'],
    methods: {
        emit(value) {
            this.$emit('update:time', value)
        }
    }
}
</script>

<style>
.md-bottom-bar {
    position: absolute;
    bottom: 0;
}

.md-bottom-bar > div {
    justify-content: space-around;
}
</style>

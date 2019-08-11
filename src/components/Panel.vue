<template>
    <div>
        <!-- TOOD: expand action by flag -->
        <!-- <expansion-panel :value="flag" expand> -->
        <div v-for="(value, time) in list" :key="time">
            <div v-text="time" />
            <!-- <card> -->
            <!-- <list> -->
            <ul v-for="(menus, type) in value" :key="`${type}_list-tile`">
                <!-- <list-tile-content> -->
                <li>{{type}}: {{menus | join}}</li>
                <!-- <list-tile-sub-title v-text="type" /> -->
                <!-- </list-tile-content> -->
            </ul>
            <!-- </list> -->
            <!-- </card> -->
        </div>
        <!-- </expansion-panel> -->
    </div>
</template>

<script>
export default {
    name: 'Panel',
    props: ['panel', 'list'],
    computed: {
        flag(newV) {
            return this.panel
        }
    },
    filters: {
        join: arr => arr.join(' ').replace(/\(.+\)/, '')
    }
}
</script>


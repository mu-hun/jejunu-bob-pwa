<template>
  <v-bottom-nav :active.sync="flag" :value="true" absolute color="transparent">
    <v-btn color="teal" flat value="점심">
      <span>점심</span>
      <v-icon>fastfood</v-icon>
    </v-btn>

    <v-btn color="teal" flat value="저녁">
      <span>저녁</span>
      <v-icon>restaurant</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
    name: 'BottomNav',
    props: ['time'],
    data() {
        return { flag: this.time }
    },
    watch: {
        time(newV) {
            this.flag = newV
        },
        flag(newV) {
            this.$emit('update:time', newV)
        }
    }
}
</script>

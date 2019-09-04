<template>
    <vue-svg-filler :path="path" :fill="setSvgColor" width="130px" height="130px" />
</template>

<script>
import { mapGetters } from 'vuex'
import VueSvgFiller from 'vue-svg-filler'

export default {
    props: ['name'],
    name: 'SvgWrapper',
    components: {
        VueSvgFiller
    },
    computed: {
        ...mapGetters(['setSvgColor']),
        path() {
            return `SVG/${this.name}.svg`
        }
    }
}
</script>

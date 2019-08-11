<template>
    <div>
        <div>오픈소스 라이선스</div>
        <ul>
            <li v-for="item in getList" :key="item.name" avatar>
                <div>{{item.name}}</div>
                <a target="_blank" :href="item.link">{{item.link}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'License',
    computed: {
        getList() {
            return [
                { name: 'vue', link: 'https://vuetifyjs.com' },
                { name: 'vuetify', link: 'https://vuetifyjs.com' },
                { name: 'axios', link: 'https://github.com/axios/axios' },
                {
                    name: 'register-service-worker',
                    link: 'https://github.com/yyx990803/register-service-worker'
                }
            ]
        }
    },
    data: () => ({
        dialog: false
    })
}
</script>

<style scoped>
.your-svg-icon {
    fill: currentColor;
}
</style>


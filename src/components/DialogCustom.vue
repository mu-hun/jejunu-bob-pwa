<template>
    <div id="FAB">
        <md-dialog :md-active.sync="showDialog" :md-fullscreen="false">
            <md-button class="md-icon-button" @click="showDialog = false">
                <md-icon>close</md-icon>
            </md-button>
            <md-dialog-title v-text="'라이선스 정보'" />
            <ul class="margin">
                <li v-for="item in getList" :key="item.name" avatar>
                    <div>{{item.name}}</div>
                    <a target="_blank" :href="item.link">{{item.link}}</a>
                </li>
                <li style="margin-top: 14px">
                    자세한 내역은
                    <a
                        href="https://app.fossa.io/projects/git%2Bgithub.com%2Fx86chi%2Fjejunu-bob-pwa"
                        alt="FOSSA Status"
                    >FOSSA Status</a>에서 보실 수 있습니다.
                </li>
            </ul>
            <md-dialog-title>어두운 모드</md-dialog-title>
            <md-switch class="md-primary margin" v-model="isOn">{{ isOn? '켜': '꺼' }}짐</md-switch>
        </md-dialog>

        <md-button class="md-fab md-primary" @click="showDialog = true">
            <md-icon>info</md-icon>
        </md-button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'DialogCustom',
    computed: {
        getList() {
            return [
                { name: 'vue', link: 'https://vuejs.org' },
                { name: 'vue-material', link: 'https://vuematerial.io' },
                { name: 'axios', link: 'https://github.com/axios/axios' },
                { name: 'webpack', link: 'https://webpack.js.org' }
            ]
        }
    },
    data: () => ({
        showDialog: false,
        isOn: false
    }),
    methods: {
        ...mapActions(['CHANGE_THEME'])
    },
    watch: {
        isOn(bool) {
            this.CHANGE_THEME(!bool)
        }
    }
}
</script>

<style lang="scss" scoped>
.md-theme-default-dark {
    a:not(.md-button) {
        color: #f1f1f1;
    }
}

.md-icon-button {
    position: absolute;
    align-self: flex-end;
    margin-right: 0;
}

#FAB {
    bottom: 28px;
    position: absolute;
    align-self: center;
}

.md-dialog {
    max-width: 80vw;
    height: 400px;

    .margin {
        margin: 0 24px;
    }

    ul {
        padding: 0;
    }

    li {
        list-style-type: none;
    }
}
</style>

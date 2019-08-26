<template>
    <div>
        <!-- TODO: 패널 요소 모듈화 -->
        <div v-for="(value, time) in list" :key="time" v-bind:class="{'active': time === selected}">
            <button class="accordion" @click="CHANGE_TIME(time)" v-text="time" />
            <ul class="panel">
                <li v-for="(menus, type) in value" :key="`${type}_list-tile`">
                    <div class="menus">{{menus | join}}</div>
                    <div class="time">{{type}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    name: 'Panel',
    props: ['list'],
    computed: {
        ...mapGetters({ selected: 'time' })
    },
    filters: {
        join: arr => arr.join(' ').replace(/\(.+\)/, '')
    },
    // TODO FIX: 데이터가 잘 전달되지만, 하단 바와 동기화 안됨
    methods: mapActions(['CHANGE_TIME'])
}
</script>

<style lang="scss" scoped>
/* TODO add overwrite preitter rule: jsx-bracket-same-line 

for single line property
*/
.md-theme-default-dark {
    .active > .accordion {
        background-color: rgb(39, 41, 43);
    }
    .accordion {
        background-color: rgb(29, 31, 32);
        color: rgb(208, 204, 197);
    }

    .panel {
        background-color: inherit;

        :after {
            background-color: inherit;
        }

        .menus {
            color: rgba(232, 230, 227, 0.87);
        }

        .time {
            color: rgba(232, 230, 227, 0.54);
        }
    }
}

.accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
    line-height: 1.5;
    font-size: 12px;

    :hover {
        background-color: #ccc;
    }
}

.active {
    .accordion {
        background-color: #ccc;
    }

    .panel {
        display: block;
    }
}

.panel {
    padding: 14px 18px;
    margin: 0;
    background-color: white;
    display: none;
    overflow: hidden;
    /* TODO: animation
	transition: 54 0.2s ease-out; */
    li {
        list-style-type: none;
        .menus {
            font-size: 16px;
        }
        .time {
            color: rgba(0, 0, 0, 0.54);
        }
    }
}
</style>

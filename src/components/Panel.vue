<template>
    <div>
        <!-- TODO: 패널 요소 모듈화 -->
        <div v-for="(value, time) in list" :key="time" v-bind:class="{'active': time === sel}">
            <button class="accordion" v-on:click="selClick(time)" v-text="time" />
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
export default {
    name: 'Panel',
    props: ['open', 'list'],
    data() {
        return {
            sel: this.open
        }
    },
    watch: {
        open(newV) {
            this.sel = newV
        }
    },
    filters: {
        join: arr => arr.join(' ').replace(/\(.+\)/, '')
    },
    methods: {
        selClick(val) {
            this.$emit('update:open', val)
        }
    }
}
</script>

<style lang="scss" scoped>
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

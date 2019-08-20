<template>
    <div>
        <div v-for="(value, time) in list" :key="time" v-bind:class="{'active': time === sel}">
            <button class="accordion" v-on:click="selClick(time)" v-text="time" />
            <ul class="panel">
                <li
                    v-for="(menus, type) in value"
                    :key="`${type}_list-tile`"
                >
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
    data(){
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

<style scoped>
/* Style the buttons that are used to open and close the accordion panel */
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
}

.accordion {
	font-size: 12px;
}

.active > .accordion,
.accordion:hover {
    background-color: #ccc;
}

.panel {
    padding: 0 18px;
    background-color: white;
    display: none;
    overflow: hidden;
	/* TODO: animation
	transition: 54 0.2s ease-out; */
}

.active > .panel {
    display: block;
}

.panel > li {
	list-style-type: none;
}

.panel > li > .menus {
	font-size: 16px;
}

.panel > li > .time {
	color: rgba(0,0,0,0.54);
}
</style>

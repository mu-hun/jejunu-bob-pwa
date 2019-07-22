<template>
  <v-expansion-panel v-model="panel" expand>
    <v-expansion-panel-content v-for="(value, time) in list" :key="time">
      <template v-slot:header>
        <div v-text="time" />
      </template>
      <v-card>
        <v-list>
          <v-list-tile v-for="(menus, type, index) in value" :key="`${type}_list-tile`">
            <v-list-tile-content>
              <v-list-tile-title>{{menus | join}}</v-list-tile-title>
              <v-list-tile-sub-title v-text="type" />
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index < calcEnd(value)" :key="`${type}_divider`" />
        </v-list>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
	name: 'Panel',
	props: ['panel', 'list']
}
</script>


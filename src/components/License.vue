<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" fab dark color="indigo">
        <v-icon v-text="'info'"/>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>오픈소스 라이선스</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-tile v-for="item in getList" :key="item.name" avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
            <v-list-tile-sub-title>
              <a target="_blank" :href="item.link">{{item.link}}</a>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
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


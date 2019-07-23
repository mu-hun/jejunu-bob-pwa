// vue.config.js
module.exports = {
    pwa: {
        themeColor: '#F1F1F1',
        background_color: '#F1F1F1'
	},
	filenameHashing: false,
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.use('vue-svg-loader').loader('vue-svg-loader')
    }
}

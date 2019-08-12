const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const mode = process.env.MODE
const isProd = mode !== 'production'

module.exports = {
    mode,
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: '[name].js',
        // chunkFilename: '[name].js', // TODO: https://webpack.js.org/plugins/commons-chunk-plugin/
        path: `${__dirname}/public`
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './public',
                            hmr: !isProd
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '!sw.js',
                '!robots.txt',
                '!manifest.json',
                '!index.html',
                '!favicon.ico',
                '!img/*'
            ]
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css'
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: `${__dirname}/public`,
        port: 8080,
        open: true
    }
}

// https://github.com/ampedandwired/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const config = require('../config')

module.exports = isProd => glob.sync('./src/page/**/*.js').map(file => {
    try {
        file = file.match(/\/page\/(.+)\.js$/).pop()
        if (isProd) {
            // generate dist index.html with correct asset hash for caching.
            // you can customize output by editing /index.html
            // see https://github.com/ampedandwired/html-webpack-plugin
            return new HtmlWebpackPlugin({
                filename: `${config.build.assetsRoot}/${file}.html`,
                inject: true,
                template: './src/template.ejs',
                page: file,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency'
            })
        } else {
            return new HtmlWebpackPlugin({
                filename: `${file}.html`,
                inject: true,
                template: './src/template.ejs',
                page: file
            })
        }
    } catch (e) {}
})

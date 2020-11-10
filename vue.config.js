const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
        lintOnSave: false,
        publicPath: process.env.VUE_APP_CDN,
        productionSourceMap: false,
        outputDir:"h5",
        devServer: {
            host: "0.0.0.0",
            open: true,
            hotOnly: true,
            disableHostCheck: true,
            proxy: {
                '/edu/': {
                    target: 'http://localhost:5000/',
                    changeOrigin: true,//这里设置是否跨域
                    pathRewrite: {
                      '^/edu/': ''
                    }
                },
                '/wx/': {
                    target: 'http://edu.jingyujiazhang.cn/api/',
                    changeOrigin: true,//这里设置是否跨域
                }
            }
        },
        chainWebpack: (config) => {
                    config.resolve.alias
                    .set('@', resolve('src'))
                    .set('assets', resolve('src/assets'));

        return config;
    }
};

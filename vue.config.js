module.exports = {
    // publicPath:'/',
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    chainWebpack: config => {config.plugins.delete('prefetch')},
    devServer:{
        port:8551,
        open:true,
        proxy:{
            'lei/':{
                target:'http://192.168.2.106:8251/',
                secure:false,
                pathRewrite:{
                    '^/lei':'',
                }
            },
        }
    },
    pwa: {
        iconPaths: {
            favicon32     : 'favicon.ico',
            favicon16     : 'favicon.ico',
            appleTouchIcon : 'favicon.ico',
            maskIcon      : 'favicon.ico',
            msTileImage   : 'favicon.ico'
        }
    },
}
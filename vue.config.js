module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.60.156:8181/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
            '/socket.io': {
                target: 'http://192.168.60.156:8181', // target host
                changeOrigin: true, // needed for virtual hosted sites
                logLevel: 'debug'
            }
        },
        
    },
}
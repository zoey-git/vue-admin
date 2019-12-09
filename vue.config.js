module.exports = {
    devServer: {
        proxy: {
            '/api/img': {
                target: 'http://shibe.online/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/img': ''
                }
            },
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
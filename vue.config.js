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
            },
            '/socket.io': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true
            }
        }
    }
}
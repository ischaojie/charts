module.exports = {
    module: {
        rules: [
            // ... 忽略其它规则

            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ]
    },
    // 插件忽略
}
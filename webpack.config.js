const alias = require("./webpack.alias");

module.exports = {
    output: {
        chunkFilename: 'js/[name].js?id=[chunkhash]',
    },
    resolve: {
        alias: Object.fromEntries(Object.entries(alias)
                                        .map(([key, path]) => [`@Domain/${key}`, path])),
        fallback: {
            "fs": false
        },
    }
}

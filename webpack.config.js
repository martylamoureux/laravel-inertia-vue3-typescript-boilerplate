const alias = require("./webpack.alias");
const path = require("path");

module.exports = {
    output: {
        chunkFilename: 'js/[name].js?id=[chunkhash]',
    },
    resolve: {
        alias: {
            "@": path.resolve("resources/js"),
            "ziggy": path.resolve('vendor/tightenco/ziggy/dist'),
            ...Object.fromEntries(Object.entries(alias).map(([key, path]) => [`@Domain/${key}`, path]))
        },
        fallback: {
            "fs": false
        },
    }
}

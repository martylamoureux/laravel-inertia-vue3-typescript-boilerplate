const mix = require('laravel-mix');
const path = require("path");
const fs = require("fs");

mix.version();

mix.before(() => {
    console.log("Generating aliases based on modules...");
    const alias = require("./webpack.alias");

    let componentResolverFile = "module.exports = name => {";

    for (let moduleName in alias) {
        componentResolverFile += "if (name.startsWith(`" + moduleName + "::`)) {"
        componentResolverFile += "const [_, component] = name.split(\"::\", 2);"
        // componentResolverFile += "return require(`@Domain/" + moduleName + "/Pages/${component}`).default;"
        componentResolverFile += "return import(`@Domain/" + moduleName + "/Pages/${component}`).then(m=>m.default);"
        componentResolverFile += "}"
    }

    componentResolverFile += "return require(`@/Pages/${name}`).default";
    componentResolverFile += "}";

    fs.writeFileSync(path.resolve("resources", "js", "componentResolver.js"), componentResolverFile);
});


// Javascript

mix.ts('resources/js/app.ts', 'public/js')
   .vue({ version: 3 })
   .alias({
       "@": path.resolve("resources/js"),
   })
   .webpackConfig(() => require("./webpack.config"))
// .webpackConfig({
//     resolve: {
//         restrictions: [/.+(?<!\.php)$/],
//     }
// });

// Styles

mix.postCss('resources/css/app.css', 'public/css', [
    require("tailwindcss")
]);

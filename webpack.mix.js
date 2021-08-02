const mix = require('laravel-mix');
const path = require("path");
const fs = require("fs");
const { exec } = require('child_process');
const chokidar = require('chokidar');

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

mix.extend("dto", new class {
    boot() {
        const command = () => exec(
            `php artisan typescript:transform`,
            (error, stdout, stderr) => console.log(stdout)
        );

        command();

        if (Mix.isWatching()) {
            (chokidar.watch(["app/DTO/*.php", "app/Domain/**/DTO/*.php"]))
                .on('change', (path) => {
                    console.log(`${path} changed...`);
                    command();
                });
        };
    }
})

// Generating routes JS file
mix.extend('ziggy', new class {
    register(config = {}) {
        this.watch = config.watch ?? ['routes/**/*.php'];
        this.path = config.path ?? '';
        this.enabled = config.enabled ?? !Mix.inProduction();
    }

    boot() {
        if (!this.enabled) return;

        const command = () => exec(
            `php artisan ziggy:generate ${this.path}`,
            (error, stdout, stderr) => console.log(stdout)
        );

        command();

        if (Mix.isWatching() && this.watch) {
            (chokidar.watch(this.watch))
                .on('change', (path) => {
                    console.log(`${path} changed...`);
                    command();
                });
        };
    }
}());

// Javascript

mix.ts('resources/js/app.ts', 'public/js')
   .vue({ version: 3 })
   .webpackConfig(() => require("./webpack.config"))
   .ziggy({
       watch: ['routes/**/*.php', 'app/Domain/**/Http/Routes/*.php'],
       path: "./resources/js/ziggy.generated.js",
       enabled: true,
   });
// .webpackConfig({
//     resolve: {
//         restrictions: [/.+(?<!\.php)$/],
//     }
// });

// Styles

mix.postCss('resources/css/app.css', 'public/css', [
    require("tailwindcss")
]);

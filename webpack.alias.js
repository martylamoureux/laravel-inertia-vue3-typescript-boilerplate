const path = require("path");
const fs = require("fs");

const domainDir = path.resolve("app/Domain");

function getModules(dir, prefix = "") {
    const res = {};

    for (let subdirectory of fs.readdirSync(dir)) {
        const moduleDir = path.resolve(dir, subdirectory);
        const frontDir = path.resolve(moduleDir, "Http", "Front");
        if (fs.existsSync(frontDir)) {
            res[prefix + subdirectory] = frontDir;
            continue;
        }

        const submodules = getModules(moduleDir, prefix + subdirectory + "/");
        for (let key in submodules) {
            res[key] = submodules[key];
        }
    }

    return res;
}

const alias = getModules(domainDir);

module.exports = alias;

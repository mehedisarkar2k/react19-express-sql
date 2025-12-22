import type { Router } from "express";
import fs from "fs";
import path from "path";

const modules: Array<{
    path: string;
    router: Router;
}> = [];


const files = fs.readdirSync(path.join(__dirname));
const dynamicExt = fs.existsSync(path.join(__dirname, 'index.ts')) ? 'routes.ts' : 'routes.js';

files.forEach((file) => {
    if (file === 'index.ts') return;

    const modulePath = path.join(__dirname, file, `${file}.${dynamicExt}`);
    const moduleRouter = require(modulePath)?.default;

    if (moduleRouter) {
        modules.push({ path: `/${file}`, router: moduleRouter });
    } else {
        console.log("\n=====================================")
        console.log("Router not found: ");
        console.log("You need to export default router in ", file);
        console.log("=====================================\n");
    }
});


export { modules };
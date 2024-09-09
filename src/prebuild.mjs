import fs from "fs";

fs.writeFileSync(
    "src/compile.ts",
    `export const CompileTime = ${JSON.stringify(new Date().toISOString())};`
);

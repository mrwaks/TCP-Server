"use strict";

const path = require("path");
const fs = require("fs/promises");
const { existsSync } = require("fs");

const pathToLogs = path.join(__dirname, "..", "logs", "logs.log");

const logger = async (log, br = "") => {
    if (!existsSync(pathToLogs)) {
        return await fs.writeFile(pathToLogs, `{${log}}`);
    }
    if ((await fs.readFile(pathToLogs, "utf-8")).toString().trim() == 0) {
        return await fs.writeFile(pathToLogs, `{${log}}`);
    }
    await fs.appendFile(pathToLogs, `\n{${log}}${br == "br" ? "\n\n" : ""}`);
};

module.exports = logger;
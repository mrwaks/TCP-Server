#!/usr/bin/env node

"use strict";

const fs = require("fs/promises");
const cp = require("child_process");
const path = require("path");
const { promisify } = require("util");
const figlet = promisify(require("figlet"));

(async ([, , ...args] = process.argv) => {
    try {
        const user = {};
        for (let i in args) {
            if (/^-n$|^--name$/.test(args[i])) {
                const data = args[+i + 1];
                if (/^-|^--/.test(data)) {
                    throw new TypeError(`Data error: '${data}'`);
                }
                if (!/[a-zA-Z]/g.test(data)) {
                    throw TypeError("Data error: name must be of type string");
                }
                user.name = data;
            }
            if (/^-n=|^--name=/.test(args[i])) {
                const data = args[i].split("=")[1];
                if (/^-|^--/.test(data)) {
                    throw new TypeError(`Data error: '${data}'`);
                }
                if (!/[a-zA-Z]/g.test(data)) {
                    throw TypeError("Data error: name must be of type string");
                }
                user.name = data;
            }
    
            if (/^-a$|^--age$/.test(args[i])) {
                const data = args[+i + 1];
                if (/^-|^--/.test(data)) {
                    throw new TypeError(`Data error: '${data}'`);
                }
                if (isNaN(data)) {
                    throw new TypeError("Data error: age must be of type number");
                }
                user.age = +data;
            }
            if (/^-a=|^--age=/.test(args[i])) {
                const data = args[i].split("=")[1];
                if (/^-|^--/.test(data)) {
                    throw new TypeError(`Data error: '${data}'`);
                }
                if (isNaN(data)) {
                    throw new TypeError("Data error: age must be of type number");
                }
                user.age = +data;
            }
            if (/^-v$|^--version$|^version$/.test(args[i])) {
                const fig = await figlet("TCP SERVER V 1");
                return console.log(fig);
            }
        }

        if (!user.hasOwnProperty("name") || !user.hasOwnProperty("age")) {
            throw new Error("Missing data: 'name/age'");
        }

        await fs.writeFile(path.join(__dirname, "..", "data.txt"), JSON.stringify(user));
        const stdout = cp.execSync(`node "${path.join(__dirname, "..", "clients", "client.js")}"`);
        console.log(stdout.toString().trim());
    } catch (error) {
        console.log(error.message);
    }
})();
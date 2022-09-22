"use strict";

const net = require("net");
const fs = require("fs/promises");
const db = require("./database/data.json");
const path = require("path");
const beautify = require("js-beautify");
const logger = require("./modules/logger.js");

const port = 8888;
const log = {};

const server = net.createServer(onClientConnection);

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

function onClientConnection(sock) {
    console.log(`TCP Server ${sock.remoteAddress}:${sock.remotePort} Connected`);
    logger(`TCP Server ${sock.remoteAddress}:${sock.remotePort} Connected`);

    sock.on("data", async data => {
        try {
            console.log(`TCP Server received data: ${data}`);
            logger(`TCP Server received data: ${data}`);
            if (!Buffer.isBuffer(data)) {
                sock.write("Data must be of type buffer");
                return sock.end();
            }

            data = data.toString();

            if (JSON.parse(data) == -1) {
                data = JSON.parse(data);
            }
            
            db.push(JSON.parse(data));

            await fs.writeFile(path.join(__dirname, "database", "data.json"), beautify(JSON.stringify(db)));

            sock.write("Data saved in database");
            logger("TCP Server: Data saved in database");

            console.log("TCP Server: response sent to the client");
            logger("TCP Server: response sent to the client");

            return sock.end();
        } catch (error) {
            if (error instanceof SyntaxError) {
                if (/JSON/.test(error.message)) {
                    sock.write(JSON.stringify({ error: "Data must be of type string" }));
                    return sock.end();
                }
            }
            if (error instanceof Error) {
                sock.write(error.message);
                return sock.end();
            }
        }
    });

    sock.on("close", () => {
        console.log(`TCP Server ${sock.remoteAddress}:${sock.remotePort} Connection closed`);
        logger(`TCP Server ${sock.remoteAddress}:${sock.remotePort} Connection closed`, "br");
    });

    sock.on("error", error => {
        console.log(`${sock.remoteAddress}:${sock.remotePort} Connection error ${error}`);
        logger(`${sock.remoteAddress}:${sock.remotePort} Connection error ${error}`, "br");
    });
};

process.on("SIGINT", () => {
    console.log("\nTCP Server interrupted by 'SIGINT'");
    process.exit(1);
});
"use strict";

const net = require("net");
const fs = require("fs/promises");
const path = require("path");
const logger = require("../modules/logger.js");

const port = 8888;

const client1 = new net.Socket();

client1.connect(port, async () => {
    console.log(`Client: connected to server on port ${port}`);
    logger(`Client: connected to server on port ${port}`);

    const buffer = await fs.readFile(path.join(__dirname, "..", "data.txt"));

    client1.write(buffer);
    console.log("Client: transmitted data");
    logger("Client: transmitted data");

    await fs.rm(path.join(__dirname, "..", "data.txt"));
});

client1.on("data", data => {
    console.log(`Client: Server Response: ${data}`);
    logger(`Client: Server Response: ${data}`);
});

client1.on("close", () => {
    console.log("Client: connection closed");
    logger("Client: connection closed");
});

client1.on("error", error => {
    console.log(`Client: Connection error: ${error}`);
    logger(`Client: Connection error: ${error}`);
});
# PRESENTATION

**This repo is a playground test of TCP Server.**

*The TCP protocol is part of the 4th layer of the OSI model (Open Systems Interconnection model), called the "Transport" layer.
It is a connection-oriented, reliable protocol that guarantees the transmission of data with acknowledgment of each segment of data delivered to the destination application.*

<hr>

## **MANUAL**

Throw the TCP Server from the path root:

    npm start

Then, to post an user in the dummy database, run:

    ./.bin/postUser.js [OPTIONS] <DATA>

#### Options:
- --name | -n -> user name (must be of type string).
- --age | -a -> user age (must be of type number).
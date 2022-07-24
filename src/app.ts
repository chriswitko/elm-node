"use strict";

import express from "express";
import recognition from "./ts/recognition";

console.log("Starting on: " + require("os").hostname().toLocaleLowerCase());
/**
 * Catch the uncaught errors that weren't wrapped in a domain or try catch statement
 * do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
 */
process.on("uncaughtException", (err) => {
  // handle the error safely
  console.log(err);
});

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

/** @module Server Runtime */
const server = express();

/**
 * Setup the basic server handling
 */
server.use(
  express.urlencoded({
    extended: true,
  })
);

server.get("/api/recognise", recognition.recognisePath);

// If we are running inside IIS then bind to the port it asks us to
let portToOpen = process.env.PORT ? parseInt(process.env.PORT, 10) : 9090;

console.log("Port: " + portToOpen);

server.listen(portToOpen);

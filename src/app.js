"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var recognition_1 = __importDefault(require("./ts/recognition"));
console.log("Starting on: " + require("os").hostname().toLocaleLowerCase());
/**
 * Catch the uncaught errors that weren't wrapped in a domain or try catch statement
 * do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
 */
process.on("uncaughtException", function (err) {
    // handle the error safely
    console.log(err);
});
process.on("unhandledRejection", function (reason, p) {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
});
/** @module Server Runtime */
var server = (0, express_1.default)();
/**
 * Setup the basic server handling
 */
server.use(express_1.default.urlencoded({
    extended: true,
}));
server.post("/api/recognise", recognition_1.default.recognisePath);
// If we are running inside IIS then bind to the port it asks us to
var portToOpen = process.env.PORT ? parseInt(process.env.PORT, 10) : 9090;
console.log("Port: " + portToOpen);
server.listen(portToOpen);
//# sourceMappingURL=app.js.map
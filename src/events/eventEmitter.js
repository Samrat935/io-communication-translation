import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

// Optional: set max listeners to prevent warning if many listeners
eventEmitter.setMaxListeners(20);

export default eventEmitter;

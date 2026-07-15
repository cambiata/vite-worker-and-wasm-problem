import { ChildHandshake, LocalHandle, WorkerMessenger } from "post-me";
import { add, AutocorrelationDetector, McLeodDetector } from "./src/lib/rs_lib.js";

import { WorkerEvents, WorkerMethods } from "./worker_types";


const methods: WorkerMethods = {
  sum: (x: number, y: number) => x + y,
  mul: (x: number, y: number) => x * y,
  wasm_add: (x: number, y: number) => add(x, y),
};

const messenger = new WorkerMessenger({ worker: self as any });

ChildHandshake(messenger, methods).then((connection) => {
  const localHandle: LocalHandle<WorkerMethods, WorkerEvents> = connection
    .localHandle();

  // Emit custom events to the worker
  localHandle.emit("ping", "Oh, hi!");
});

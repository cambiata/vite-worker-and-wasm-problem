// types.ts

export type WorkerMethods = {
  sum: (x: number, y: number) => number;
  mul: (x: number, y: number) => number;
  wasm_add: (x: number, y: number) => number;
};

export type WorkerEvents = {
  "ping": string;
};

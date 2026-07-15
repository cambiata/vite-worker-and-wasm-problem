// import { init_worker } from "../worker_utils";
// console.log("Comp.tsx loaded");
// const handle = await init_worker();
// const sum = await handle.call("wasm_add", 33, 44);
// console.log("Sum result from worker:", sum);

import { add } from './lib/rs_lib';


const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
console.log('🐝 Main: Worker created', worker);
worker.onmessage = (event) => {
  console.log('🍏 Message received from worker: ', event.data);
};

worker.onerror = (event) => {
  if (event instanceof Event) {
    console.log('🍎 Error message received from worker: ', event);
    return event;
  }

  console.log('🍎 Unexpected error: ', event);
  throw event;
};





export default () => {
  return <>

    <h2>Child component</h2>
    <button onClick={() => {
      const result = add(11, 22);
      console.log('🍏 Result from Rust: ', result);
    }}>Call wasm</button>

    <button onClick={() => {
      worker.postMessage([43, 34]);
    }}>Call worker</button>

  </>
};

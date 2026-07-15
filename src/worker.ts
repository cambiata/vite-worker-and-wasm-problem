import { type TWorkerMess } from './worker_types';

// importing the add function from the wasm module 
import { add } from './lib/rs_lib';


const onmessage = (event: MessageEvent<TWorkerMess>) => {
    console.log('🐝 Worker: Message received from main script');

    const data = event.data;

    // Simple addition directly in the worker (without wasm) works fine:
    // const result = data[0] + data[1];
    // const res = 'Result: ' + result;

    // Call the add function from the wasm module breaks building:
    const wasmResult = add(data[0], data[1]);
    const res = 'WasmResult: ' + wasmResult;
    
    console.log('🐝 Worker: Posting message back to main script');
    postMessage(res);
};

addEventListener('message', onmessage);

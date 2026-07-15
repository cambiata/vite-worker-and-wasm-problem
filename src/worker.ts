import { type TWorkerMess } from './worker_types';

import { add } from './lib/rs_lib';


const onmessage = (event: MessageEvent<TWorkerMess>) => {
    console.log('🐝 Worker: Message received from main script');

    const data = event.data;
    const result = data[0] + data[1];
    const wasmResult = add(data[0], data[1]);


    // const workerResult = 'WasmResult: ' + wasmResult;
    // const res = 'Result: ' + result;
    const res = 'WasmResult: ' + wasmResult;
    console.log('🐝 Worker: Posting message back to main script');
    postMessage(res);
};

addEventListener('message', onmessage);

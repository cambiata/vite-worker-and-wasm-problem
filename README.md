## Problem: Vite building breaks when worker calling wasm

This is a simple project highlighting a problem when building a vite project containing a web worker calling wasm.

This example project is using SolidJS as frontend framework, but that doesn't seem to matter. Same poblem occurse using deno instead of node and react instead of solidjs.
`vite-plugin-wasm@3.6.0` is installed and ` wasm()` is added to the vite plugins in `vite.config.ts`.


Please note that 

- calling the worker from the front end works fine
- calling wasm directly from the front end works fine

Building in these cases is no problem: `npm run build`

When **combining workers with wasm**, it runs fine in dev mode (`npm run dev`) but breaks when building: (`npm run build`):

### Error messages

Building with `Vite 7.1.4` gives the following output:

```
vite v7.3.6 building client environment for production...
✓ 7 modules transformed.
✗ Build failed in 183ms
error during build:
[vite:worker-import-meta-url] Could not load E:/slask/Deno/solid-test/src/lib/rs_lib.wasm (imported by src/lib/rs_lib.js): "ESM integration proposal for Wasm" is not supported currently. Use vite-plugin-wasm or other community plugins to handle this. Alternatively, you can use `.wasm?init` or `.wasm?url`. See https://vite.dev/guide/features.html#webassembly for more details.
```

Building with `Vite 8.1.4` gives the following:
```
vite v8.1.4 building client environment for production...
✓ 8 modules transformed.
✗ Build failed in 131ms
error during build:
Build failed with 1 error:

[plugin vite:worker-import-meta-url] E:/slask/Deno/solid-test/src/Comp.tsx
Error: Build failed with 1 error:

[UNSUPPORTED_FEATURE] Top-level await is currently not supported with the 'iife' output format
   ╭─[ src/lib/rs_lib.wasm:5:29 ]
   │
 5 │ const __vite__wasmModule = (await __vite__initWasm({ "./rs_lib.internal.js": { "__wbg___wbindgen_copy_to_typed_array_db832bc4df7216c1": __vite__wasmImport_

 ...
 ```

My guess is that that when calling wasm from inside the worker, the wasm files falls out of "scope" for the build handling system, causing them not to be treated properly... 


### worker.ts

Here's the worker calling the wasm function, causing vite build to break:

```typescript
import { type TWorkerMess } from './worker_types';

// importing the add function from the wasm module 
import { add } from './lib/rs_lib';

const onmessage = (event: MessageEvent<TWorkerMess>) => {
    const data = event.data;

    // Simple addition directly in the worker (without wasm) works fine:
    // const result = data[0] + data[1];
    // const res = 'Result: ' + result;

    // Call the add function from the wasm module breaks building:
    const wasmResult = add(data[0], data[1]);
    const res = 'WasmResult: ' + wasmResult;

postMessage(res);
};

addEventListener('message', onmessage);
```


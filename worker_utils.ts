//----------------------------------------------------------

import { ParentHandshake, RemoteHandle, WorkerMessenger } from "post-me";
import { WorkerEvents, WorkerMethods } from "./worker_types.ts";

export async function init_worker(): Promise<
  RemoteHandle<WorkerMethods, WorkerEvents>
> {
  try {
    const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
      type: "module",
    });
    console.log(worker);
    const messenger = new WorkerMessenger({ worker });
    console.log(messenger);
    const connection = await ParentHandshake(messenger);
    console.log(connection);
    const remoteHandle: RemoteHandle<WorkerMethods, WorkerEvents> = connection
      .remoteHandle();
    console.log(remoteHandle);

    // const sum = await remoteHandle.call("sum", 3, 4);
    // console.log(sum);
    // const wasm_add = await remoteHandle.call("wasm_add", 33, 44);
    // console.log(wasm_add);
    return remoteHandle;
  } catch (error) {
    console.error("Worker initialization problem:", error);
    throw error;
  }
}

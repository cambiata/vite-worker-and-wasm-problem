// @generated file from wasmbuild -- do not edit
// @ts-nocheck: generated
// deno-lint-ignore-file
// deno-fmt-ignore-file

let wasm;
export function __wbg_set_wasm(val) {
  wasm = val;
}

function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
  if (
    cachedFloat32ArrayMemory0 === null ||
    cachedFloat32ArrayMemory0.byteLength === 0
  ) {
    cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
  }
  return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (
    cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0
  ) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}

function passArrayF32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4, 4) >>> 0;
  getFloat32ArrayMemory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8ArrayMemory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachedTextDecoder = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true,
    });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(
    getUint8ArrayMemory0().subarray(ptr, ptr + len),
  );
}

const cachedTextEncoder = new TextEncoder();

if (!("encodeInto" in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length,
    };
  };
}

let WASM_VECTOR_LEN = 0;

const AutocorrelationDetectorFinalization =
  (typeof FinalizationRegistry === "undefined")
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
      wasm.__wbg_autocorrelationdetector_free(ptr >>> 0, 1)
    );

const GreeterFinalization = (typeof FinalizationRegistry === "undefined")
  ? { register: () => {}, unregister: () => {} }
  : new FinalizationRegistry((ptr) => wasm.__wbg_greeter_free(ptr >>> 0, 1));

const McLeodDetectorFinalization = (typeof FinalizationRegistry === "undefined")
  ? { register: () => {}, unregister: () => {} }
  : new FinalizationRegistry((ptr) =>
    wasm.__wbg_mcleoddetector_free(ptr >>> 0, 1)
  );

export class AutocorrelationDetector {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(AutocorrelationDetector.prototype);
    obj.__wbg_ptr = ptr;
    AutocorrelationDetectorFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    AutocorrelationDetectorFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_autocorrelationdetector_free(ptr, 0);
  }
  /**
   * @param {number} size
   * @param {number} padding
   * @returns {AutocorrelationDetector}
   */
  static new(size, padding) {
    const ret = wasm.autocorrelationdetector_new(size, padding);
    return AutocorrelationDetector.__wrap(ret);
  }
  /**
   * @param {Float32Array} signal
   * @param {number} sample_rate
   * @param {number} power_threshold
   * @param {number} clarity_threshold
   * @param {Float32Array} pitch
   */
  get_pitch(signal, sample_rate, power_threshold, clarity_threshold, pitch) {
    const ptr0 = passArrayF32ToWasm0(signal, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArrayF32ToWasm0(pitch, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.autocorrelationdetector_get_pitch(
      this.__wbg_ptr,
      ptr0,
      len0,
      sample_rate,
      power_threshold,
      clarity_threshold,
      ptr1,
      len1,
      pitch,
    );
  }
}
if (Symbol.dispose) {
  AutocorrelationDetector.prototype[Symbol.dispose] =
    AutocorrelationDetector.prototype.free;
}

export class Greeter {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GreeterFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_greeter_free(ptr, 0);
  }
  /**
   * @param {string} name
   */
  constructor(name) {
    const ptr0 = passStringToWasm0(
      name,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.greeter_new(ptr0, len0);
    this.__wbg_ptr = ret >>> 0;
    GreeterFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {string}
   */
  greet() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.greeter_greet(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
}
if (Symbol.dispose) Greeter.prototype[Symbol.dispose] = Greeter.prototype.free;

export class McLeodDetector {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(McLeodDetector.prototype);
    obj.__wbg_ptr = ptr;
    McLeodDetectorFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    McLeodDetectorFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_mcleoddetector_free(ptr, 0);
  }
  /**
   * @param {number} size
   * @param {number} padding
   * @returns {McLeodDetector}
   */
  static new(size, padding) {
    const ret = wasm.autocorrelationdetector_new(size, padding);
    return McLeodDetector.__wrap(ret);
  }
  /**
   * @param {Float32Array} signal
   * @param {number} sample_rate
   * @param {number} power_threshold
   * @param {number} clarity_threshold
   * @param {Float32Array} pitch
   */
  get_pitch(signal, sample_rate, power_threshold, clarity_threshold, pitch) {
    const ptr0 = passArrayF32ToWasm0(signal, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArrayF32ToWasm0(pitch, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.mcleoddetector_get_pitch(
      this.__wbg_ptr,
      ptr0,
      len0,
      sample_rate,
      power_threshold,
      clarity_threshold,
      ptr1,
      len1,
      pitch,
    );
  }
}
if (Symbol.dispose) {
  McLeodDetector.prototype[Symbol.dispose] = McLeodDetector.prototype.free;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a, b) {
  const ret = wasm.add(a, b);
  return ret;
}

export function __wbg___wbindgen_copy_to_typed_array_db832bc4df7216c1(
  arg0,
  arg1,
  arg2,
) {
  new Uint8Array(arg2.buffer, arg2.byteOffset, arg2.byteLength).set(
    getArrayU8FromWasm0(arg0, arg1),
  );
}

export function __wbg___wbindgen_throw_dd24417ed36fc46e(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}

export function __wbindgen_init_externref_table() {
  const table = wasm.__wbindgen_externrefs;
  const offset = table.grow(4);
  table.set(0, undefined);
  table.set(offset + 0, undefined);
  table.set(offset + 1, null);
  table.set(offset + 2, true);
  table.set(offset + 3, false);
}

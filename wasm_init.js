window.game = {};
let wasm;
function __wbg_set_wasm(val) {
  wasm = val;
}
window.game.__wbg_set_wasm = __wbg_set_wasm;

const lTextDecoder =
  typeof TextDecoder === "undefined"
    ? (0, module.require)("util").TextDecoder
    : TextDecoder;

let cachedTextDecoder = new lTextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

function getObject(idx) {
  return heap[idx];
}

function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder =
  typeof TextEncoder === "undefined"
    ? (0, module.require)("util").TextEncoder
    : TextEncoder;

let cachedTextEncoder = new lTextEncoder("utf-8");

const encodeString =
  typeof cachedTextEncoder.encodeInto === "function"
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
      }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
          read: arg.length,
          written: buf.length,
        };
      };

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8Memory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3), 1) >>> 0;
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}
/**
 * @param {string} data
 * @returns {ParseResult}
 */
function deserialize(data) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      data,
      wasm.__wbindgen_export_0,
      wasm.__wbindgen_export_1
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.deserialize(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
window.game.deserialize = deserialize;
/**
 * @param {ParseResult} data
 * @returns {string}
 */
function serialize(data) {
  let deferred2_0;
  let deferred2_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.serialize(retptr, addHeapObject(data));
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    var r3 = getInt32Memory0()[retptr / 4 + 3];
    var ptr1 = r0;
    var len1 = r1;
    if (r3) {
      ptr1 = 0;
      len1 = 0;
      throw takeObject(r2);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export_2(deferred2_0, deferred2_1, 1);
  }
}
window.game.serialize = serialize;

/**
 * @param {string} data
 * @returns {HistoryReconstruction}
 */
function reconstruct(data) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      data,
      wasm.__wbindgen_export_0,
      wasm.__wbindgen_export_1
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.reconstruct(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
window.game.reconstruct = reconstruct;

/**
 * @param {ParseResult} data
 * @returns {HistoryReconstruction}
 */
function reconstruct_recording(data) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.reconstruct_recording(retptr, addHeapObject(data));
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
window.game.reconstruct_recording = reconstruct_recording;

/**
 * @param {string} data
 * @returns {ValidationResult}
 */
function validate(data) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      data,
      wasm.__wbindgen_export_0,
      wasm.__wbindgen_export_1
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.validate(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
window.game.validate = validate;

/**
 * @param {string} data
 * @returns {string}
 */
function validate_all(data) {
  let deferred2_0;
  let deferred2_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      data,
      wasm.__wbindgen_export_0,
      wasm.__wbindgen_export_1
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.validate_all(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    deferred2_0 = r0;
    deferred2_1 = r1;
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export_2(deferred2_0, deferred2_1, 1);
  }
}
window.game.validate_all = validate_all;

/**
 * @param {number} size
 * @param {number} seed
 * @param {number} add_tiles
 * @returns {Board}
 */
function initial_board(size, seed, add_tiles) {
  const ret = wasm.initial_board(size, seed, add_tiles);
  return takeObject(ret);
}
window.game.initial_board = initial_board;

/**
 * @param {number} size
 * @param {number | undefined} seed
 * @returns {string}
 */
function new_game(size, seed) {
  let deferred1_0;
  let deferred1_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.new_game(retptr, size, !isLikeNone(seed), isLikeNone(seed) ? 0 : seed);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    deferred1_0 = r0;
    deferred1_1 = r1;
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export_2(deferred1_0, deferred1_1, 1);
  }
}
window.game.new_game = new_game;

/**
 * @param {string} data
 * @returns {GameState}
 */
function get_gamestate(data) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      data,
      wasm.__wbindgen_export_0,
      wasm.__wbindgen_export_1
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.get_gamestate(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
window.game.get_gamestate = get_gamestate;

/**
 * @param {ParseResult} data
 * @returns {GameState}
 */
function get_gamestate_from_recording(data) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.get_gamestate_from_recording(retptr, addHeapObject(data));
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
window.game.get_gamestate_from_recording = get_gamestate_from_recording;

/**
 * @param {Board} board
 * @param {Direction} dir
 * @param {boolean} add_random
 * @returns {MoveResult}
 */
function apply_move(board, dir, add_random) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.apply_move(
      retptr,
      addHeapObject(board),
      addHeapObject(dir),
      add_random
    );
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    if (r2) {
      throw takeObject(r1);
    }
    return takeObject(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
window.game.apply_move = apply_move;

/**
 * @param {Board} board
 * @returns {Board}
 */
function add_random(board) {
  const ret = wasm.add_random(addHeapObject(board));
  return takeObject(ret);
}
window.game.add_random = add_random;

/**
 * @param {string} data
 * @returns {string}
 */
function hash(data) {
  let deferred3_0;
  let deferred3_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      data,
      wasm.__wbindgen_export_0,
      wasm.__wbindgen_export_1
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.hash(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    var r3 = getInt32Memory0()[retptr / 4 + 3];
    var ptr2 = r0;
    var len2 = r1;
    if (r3) {
      ptr2 = 0;
      len2 = 0;
      throw takeObject(r2);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export_2(deferred3_0, deferred3_1, 1);
  }
}
window.game.hash = hash;

/**
 * @param {ParseResult} data
 * @returns {string}
 */
function hash_recording(data) {
  let deferred1_0;
  let deferred1_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.hash_recording(retptr, addHeapObject(data));
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    deferred1_0 = r0;
    deferred1_1 = r1;
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_export_2(deferred1_0, deferred1_1, 1);
  }
}
window.game.hash_recording = hash_recording;

/**
 * @param {number} seed
 * @returns {number}
 */
function lcg_sane(seed) {
  const ret = wasm.lcg_sane(seed);
  return ret >>> 0;
}
window.game.lcg_sane = lcg_sane;

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_export_3(addHeapObject(e));
  }
}

function __wbindgen_string_new(arg0, arg1) {
  const ret = getStringFromWasm0(arg0, arg1);
  return addHeapObject(ret);
}
window.game.__wbindgen_string_new = __wbindgen_string_new;

function __wbindgen_object_clone_ref(arg0) {
  const ret = getObject(arg0);
  return addHeapObject(ret);
}
window.game.__wbindgen_object_clone_ref = __wbindgen_object_clone_ref;

function __wbindgen_object_drop_ref(arg0) {
  takeObject(arg0);
}
window.game.__wbindgen_object_drop_ref = __wbindgen_object_drop_ref;

function __wbindgen_is_undefined(arg0) {
  const ret = getObject(arg0) === undefined;
  return ret;
}
window.game.__wbindgen_is_undefined = __wbindgen_is_undefined;

function __wbg_crypto_c48a774b022d20ac(arg0) {
  const ret = getObject(arg0).crypto;
  return addHeapObject(ret);
}
window.game.__wbg_crypto_c48a774b022d20ac = __wbg_crypto_c48a774b022d20ac;

function __wbindgen_is_object(arg0) {
  const val = getObject(arg0);
  const ret = typeof val === "object" && val !== null;
  return ret;
}
window.game.__wbindgen_is_object = __wbindgen_is_object;

function __wbg_process_298734cf255a885d(arg0) {
  const ret = getObject(arg0).process;
  return addHeapObject(ret);
}
window.game.__wbg_process_298734cf255a885d = __wbg_process_298734cf255a885d;

function __wbg_versions_e2e78e134e3e5d01(arg0) {
  const ret = getObject(arg0).versions;
  return addHeapObject(ret);
}
window.game.__wbg_versions_e2e78e134e3e5d01 = __wbg_versions_e2e78e134e3e5d01;

function __wbg_node_1cd7a5d853dbea79(arg0) {
  const ret = getObject(arg0).node;
  return addHeapObject(ret);
}
window.game.__wbg_node_1cd7a5d853dbea79 = __wbg_node_1cd7a5d853dbea79;

function __wbindgen_is_string(arg0) {
  const ret = typeof getObject(arg0) === "string";
  return ret;
}
window.game.__wbindgen_is_string = __wbindgen_is_string;

function __wbg_msCrypto_bcb970640f50a1e8(arg0) {
  const ret = getObject(arg0).msCrypto;
  return addHeapObject(ret);
}
window.game.__wbg_msCrypto_bcb970640f50a1e8 = __wbg_msCrypto_bcb970640f50a1e8;

function __wbg_require_8f08ceecec0f4fee() {
  return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_require_8f08ceecec0f4fee = __wbg_require_8f08ceecec0f4fee;

function __wbindgen_is_function(arg0) {
  const ret = typeof getObject(arg0) === "function";
  return ret;
}
window.game.__wbindgen_is_function = __wbindgen_is_function;

function __wbg_getRandomValues_37fa2ca9e4e07fab() {
  return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
  }, arguments);
}
window.game.__wbg_getRandomValues_37fa2ca9e4e07fab =
  __wbg_getRandomValues_37fa2ca9e4e07fab;

function __wbg_randomFillSync_dc1e9a60c158336d() {
  return handleError(function (arg0, arg1) {
    getObject(arg0).randomFillSync(takeObject(arg1));
  }, arguments);
}
window.game.__wbg_randomFillSync_dc1e9a60c158336d =
  __wbg_randomFillSync_dc1e9a60c158336d;

function __wbg_newnoargs_581967eacc0e2604(arg0, arg1) {
  const ret = new Function(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
}
window.game.__wbg_newnoargs_581967eacc0e2604 = __wbg_newnoargs_581967eacc0e2604;

function __wbg_call_cb65541d95d71282() {
  return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_call_cb65541d95d71282 = __wbg_call_cb65541d95d71282;

function __wbindgen_string_get(arg0, arg1) {
  const obj = getObject(arg1);
  const ret = typeof obj === "string" ? obj : undefined;
  var ptr1 = isLikeNone(ret)
    ? 0
    : passStringToWasm0(
        ret,
        wasm.__wbindgen_export_0,
        wasm.__wbindgen_export_1
      );
  var len1 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len1;
  getInt32Memory0()[arg0 / 4 + 0] = ptr1;
}
window.game.__wbindgen_string_get = __wbindgen_string_get;

function __wbg_self_1ff1d729e9aae938() {
  return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_self_1ff1d729e9aae938 = __wbg_self_1ff1d729e9aae938;

function __wbg_window_5f4faef6c12b79ec() {
  return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_window_5f4faef6c12b79ec = __wbg_window_5f4faef6c12b79ec;

function __wbg_globalThis_1d39714405582d3c() {
  return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_globalThis_1d39714405582d3c =
  __wbg_globalThis_1d39714405582d3c;

function __wbg_global_651f05c6a0944d1c() {
  return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_global_651f05c6a0944d1c = __wbg_global_651f05c6a0944d1c;

function __wbg_call_01734de55d61e11d() {
  return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_call_01734de55d61e11d = __wbg_call_01734de55d61e11d;

function __wbg_buffer_085ec1f694018c4f(arg0) {
  const ret = getObject(arg0).buffer;
  return addHeapObject(ret);
}
window.game.__wbg_buffer_085ec1f694018c4f = __wbg_buffer_085ec1f694018c4f;

function __wbg_newwithbyteoffsetandlength_6da8e527659b86aa(arg0, arg1, arg2) {
  const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
  return addHeapObject(ret);
}
window.game.__wbg_newwithbyteoffsetandlength_6da8e527659b86aa =
  __wbg_newwithbyteoffsetandlength_6da8e527659b86aa;

function __wbg_new_8125e318e6245eed(arg0) {
  const ret = new Uint8Array(getObject(arg0));
  return addHeapObject(ret);
}
window.game.__wbg_new_8125e318e6245eed = __wbg_new_8125e318e6245eed;

function __wbg_set_5cf90238115182c3(arg0, arg1, arg2) {
  getObject(arg0).set(getObject(arg1), arg2 >>> 0);
}
window.game.__wbg_set_5cf90238115182c3 = __wbg_set_5cf90238115182c3;

function __wbg_newwithlength_e5d69174d6984cd7(arg0) {
  const ret = new Uint8Array(arg0 >>> 0);
  return addHeapObject(ret);
}
window.game.__wbg_newwithlength_e5d69174d6984cd7 =
  __wbg_newwithlength_e5d69174d6984cd7;

function __wbg_subarray_13db269f57aa838d(arg0, arg1, arg2) {
  const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
  return addHeapObject(ret);
}
window.game.__wbg_subarray_13db269f57aa838d = __wbg_subarray_13db269f57aa838d;

function __wbg_parse_670c19d4e984792e() {
  return handleError(function (arg0, arg1) {
    const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_parse_670c19d4e984792e = __wbg_parse_670c19d4e984792e;

function __wbg_stringify_e25465938f3f611f() {
  return handleError(function (arg0) {
    const ret = JSON.stringify(getObject(arg0));
    return addHeapObject(ret);
  }, arguments);
}
window.game.__wbg_stringify_e25465938f3f611f = __wbg_stringify_e25465938f3f611f;

function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
window.game.__wbindgen_throw = __wbindgen_throw;

function __wbindgen_memory() {
  const ret = wasm.memory;
  return addHeapObject(ret);
}
window.game.__wbindgen_memory = __wbindgen_memory;

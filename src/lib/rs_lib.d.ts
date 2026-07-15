// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file

export class AutocorrelationDetector {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static new(size: number, padding: number): AutocorrelationDetector;
  get_pitch(
    signal: Float32Array,
    sample_rate: number,
    power_threshold: number,
    clarity_threshold: number,
    pitch: Float32Array,
  ): void;
}

export class Greeter {
  free(): void;
  [Symbol.dispose](): void;
  constructor(name: string);
  greet(): string;
}

export class McLeodDetector {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static new(size: number, padding: number): McLeodDetector;
  get_pitch(
    signal: Float32Array,
    sample_rate: number,
    power_threshold: number,
    clarity_threshold: number,
    pitch: Float32Array,
  ): void;
}

export function add(a: number, b: number): number;

export interface RollupArgsInterface {
  target?: 'node' | 'browser';
  env?: 'production' | 'development';
  format?: 'cjs' | 'umd' | 'esm' | 'system';
  watch?: boolean
}

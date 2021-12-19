import type { ComputedRef, Ref } from 'vue';

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};

export type Overwrite<T, K> = {
  [P in Exclude<keyof T, keyof K>]: T[P];
} & K;

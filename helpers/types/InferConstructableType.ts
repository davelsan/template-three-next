/**
 * Infer the type returned from a constructable expression.
 */
export type InferConstructableType<T> = T extends new () => infer R ? R : never;

// Extrai os valores de T que são objetos (sem gerar "never")
type OnlyObjects<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<string, any> ? T[K] : unknown;
}[keyof T];

// Faz o merge profundo e achata as chaves
type MergeDeep<T extends Record<string, any>> = {
  [K in keyof OnlyObjects<T>]: OnlyObjects<T>[K];
};

// Apenas remove qualquer inferência irregular do TS
export type DeepMergeFlatten<T extends Record<string, any>> = {
  [K in keyof MergeDeep<T>]: MergeDeep<T>[K];
};

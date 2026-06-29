declare module "@neondatabase/serverless" {
  type NeonQueryFunction = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown[]>;

  export function neon(connectionString: string): NeonQueryFunction;
}

import {
  body as expressBody,
  param as expressParam,
  validationResult,
} from 'express-validator';

// express-validator's chain type is structurally compatible at runtime but does not
// satisfy the repository's Express 4 type declarations under strict compilation.
export const body: (...args: Parameters<typeof expressBody>) => any = (...args) =>
  expressBody(...args) as any;

export const param: (...args: Parameters<typeof expressParam>) => any = (...args) =>
  expressParam(...args) as any;

export { validationResult };

// src/types/TypedRequest.ts
import { Request } from 'express';

export interface TypedRequest<TParams, TBody> extends Request<TParams> {
  body: TBody;
  params: TParams;
}

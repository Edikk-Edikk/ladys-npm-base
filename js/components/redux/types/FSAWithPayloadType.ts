import { FSAWithPayload as FSAWithPayloadBase } from 'flux-standard-action';

type FSAWithPayloadType<Payload = any> = FSAWithPayloadBase<string, Payload>;

export { FSAWithPayloadType };

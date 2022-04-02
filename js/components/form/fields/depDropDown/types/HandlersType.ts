import { Subscription } from 'rxjs/internal/Subscription';
import { ValueType } from './ValueType';

type HandlersType = {
  subscribe: (handler: (data) => void) => Subscription,
  getValue: () => ValueType,
}

export { HandlersType };

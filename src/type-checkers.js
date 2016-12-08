// @flow
import type { JSONObject } from './json.js';

export class MapPropertyChecker<T: Object> {
  requireNumber(map: JSONObject, field: $Enum<T>): number {
    const value = map.get(field);
    if (typeof value == 'number') {
      return value;
    }

    throw new TypeError(`expected number type for field: ${field}, got ${String(value)}`);
  }

  requireString(map: JSONObject, field: $Enum<T>): string {
    const value = map.get(field);
    if (typeof value == 'string') {
      return value;
    }

    throw new TypeError(`expected string type for field: ${field}, got ${String(value)}`);
  }

  optionalString(map: JSONObject, field: $Enum<T>): ?string {
    const value = map.get(field);
    if (typeof value == 'string') {
      return value;
    }
  }
}

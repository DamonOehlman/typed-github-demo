// @flow

// see: https://flowtype.org/docs/builtins.html#mixed
export type JSON = | string | number | boolean | null | JSONObject | JSONArray;
export type JSONObject = Map<string,JSON>;
export type JSONArray = Array<JSON>;

export class TypedJSON {
  static parse(x: mixed): JSON {
    if (typeof x === "object" && x !== null) {
      let o: JSONObject = new Map();
      for (let k of Object.keys(x)) {
        o.set(k, TypedJSON.parse(x[k]));
      }
      return o;
    }

    if (Array.isArray(x)) {
      return x.map(TypedJSON.parse);
    }

    if (x === null ||
        typeof x === "string" ||
        typeof x === "number" ||
        typeof x === "boolean") {
      return x;
    }

    throw new Error("Invalid JSON");
  }
}

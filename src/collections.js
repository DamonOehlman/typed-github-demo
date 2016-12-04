// @flow
export class List<T> {
  items: Array<T>;

  constructor(items: Array<T>) {
    this.items = items;
  }

  sort(comparator: (a: T, b: T) => number): List<T> {
    const sorted: Array<T> = this.items.slice(0).sort(comparator);
    return new List(sorted);
  }
}

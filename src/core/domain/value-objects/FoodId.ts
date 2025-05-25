export class FoodId {
  constructor(public readonly value: string) {
    if (!value) throw new Error("FoodId cannot be empty");
  }

  equals(other: FoodId): boolean {
    return this.value === other.value;
  }
}

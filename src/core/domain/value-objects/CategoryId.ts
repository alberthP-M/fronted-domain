export class CategoryId {
  constructor(public readonly value: string) {
    if (!value) throw new Error("CategoryId cannot be empty");
  }

  equals(other: CategoryId): boolean {
    return this.value === other.value;
  }
}

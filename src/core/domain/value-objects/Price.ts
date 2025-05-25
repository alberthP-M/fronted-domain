export class Price {
  constructor(public readonly value: number) {
    if (value < 0) throw new Error("Price cannot be negative");
    if (!Number.isFinite(value))
      throw new Error("Price must be a valid number");
  }

  add(amount: number): Price {
    return new Price(this.value + amount);
  }

  applyDiscount(percentage: number): Price {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Discount percentage must be between 0 and 100");
    }
    return new Price(this.value * (1 - percentage / 100));
  }
}

import { FoodModel } from "../entities/FoodModel";
import { Price } from "../value-objects/Price";
import { FoodId } from "../value-objects/FoodId";

export class FoodOrder {
  private readonly items: Map<FoodId, { food: FoodModel; quantity: number }> =
    new Map();
  private createdAt: Date = new Date();

  // Métodos principales
  addItem(food: FoodModel, quantity: number = 1): void {
    if (quantity <= 0) throw new Error("Quantity must be positive");
    if (!food.isActive) throw new Error("Cannot order inactive food");

    const existing = this.items.get(food.id);
    this.items.set(food.id, {
      food,
      quantity: existing ? existing.quantity + quantity : quantity,
    });
  }

  removeItem(foodId: FoodId): void {
    this.items.delete(foodId);
  }

  updateQuantity(foodId: FoodId, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(foodId);
      return;
    }

    const item = this.items.get(foodId);
    if (!item) throw new Error("Food item not found in order");

    this.items.set(foodId, { ...item, quantity: newQuantity });
  }

  // Cálculos
  calculateSubtotal(): Price {
    let total = 0;
    this.items.forEach(({ food, quantity }) => {
      total += food.price.value * quantity;
    });
    return new Price(total);
  }

  // Accessors
  get orderItems() {
    return Array.from(this.items.values());
  }

  get orderDate() {
    return this.createdAt;
  }
}

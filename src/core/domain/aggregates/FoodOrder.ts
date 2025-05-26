import { FoodModel } from "../entities/FoodModel";
import { Price } from "../value-objects/Price";
import { FoodId } from "../value-objects/FoodId";
import { DomainEvent } from "../events/DomainEvent";

export class FoodOrder {
  private readonly id: string;
  private readonly items: Map<FoodId, { food: FoodModel; quantity: number }>;
  private readonly createdAt: Date;
  private status: "pending" | "completed" | "cancelled";
  private events: DomainEvent[];

  constructor(id: string) {
    this.id = id;
    this.items = new Map();
    this.createdAt = new Date();
    this.status = "pending";
    this.events = [new OrderCreatedEvent(this.id)];
  }

  addItem(food: FoodModel, quantity: number = 1): void {
    if (this.status !== "pending")
      throw new Error("Cannot modify completed/cancelled order");
    if (quantity <= 0) throw new Error("Quantity must be positive");
    if (!food.isActive) throw new Error("Cannot order inactive food");

    const existing = this.items.get(food.id);
    const newQuantity = existing ? existing.quantity + quantity : quantity;

    this.items.set(food.id, { food, quantity: newQuantity });
    this.events.push(new OrderItemAddedEvent(this.id, food.id, quantity));
  }

  removeItem(foodId: FoodId): void {
    if (this.status !== "pending")
      throw new Error("Cannot modify completed/cancelled order");

    const item = this.items.get(foodId);
    if (item) {
      this.items.delete(foodId);
      this.events.push(
        new OrderItemRemovedEvent(this.id, foodId, item.quantity)
      );
    }
  }

  completeOrder(): void {
    if (this.status !== "pending") return;
    this.status = "completed";
  }

  cancelOrder(): void {
    if (this.status !== "pending") return;
    this.status = "cancelled";
  }

  calculateSubtotal(): Price {
    let total = 0;
    this.items.forEach(({ food, quantity }) => {
      total += food.price.value * quantity;
    });
    return new Price(total);
  }

  clearEvents(): void {
    this.events = [];
  }

  getUncommittedEvents(): DomainEvent[] {
    return [...this.events];
  }

  // Getters
  get orderId(): string {
    return this.id;
  }

  get orderItems() {
    return Array.from(this.items.values());
  }

  get orderDate() {
    return this.createdAt;
  }

  get currentStatus() {
    return this.status;
  }
}

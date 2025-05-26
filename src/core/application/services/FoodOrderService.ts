import { IFoodOrderRepository } from "../repositories/IFoodOrderRepository";
import { FoodOrder } from "../../domain/aggregates/FoodOrder";
import { FoodModel } from "../../domain/entities/FoodModel";

export class FoodOrderService {
  constructor(private repository: IFoodOrderRepository) {}

  async createNewOrder(): Promise<FoodOrder> {
    const newOrder = new FoodOrder(this.generateOrderId());
    await this.repository.save(newOrder);
    return newOrder;
  }

  async addItemToOrder(
    orderId: string,
    food: FoodModel,
    quantity: number
  ): Promise<void> {
    const order = await this.repository.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.addItem(food, quantity);
    await this.repository.save(order);
  }

  async completeOrder(orderId: string): Promise<void> {
    const order = await this.repository.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.completeOrder();
    await this.repository.save(order);
  }

  private generateOrderId(): string {
    return `order-${Date.now()}`;
  }
}

import axios from "axios";
import { FoodOrder } from "../../domain/aggregates/FoodOrder";
import { FoodModel } from "../../domain/entities/FoodModel";
import { FoodId } from "../../domain/value-objects/FoodId";
import { Price } from "../../domain/value-objects/Price";

export class OrderApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getOrder(orderId: string): Promise<{
    id: string;
    items: Array<{ food: FoodModel; quantity: number }>;
    status: string;
  }> {
    const response = await axios.get(`${this.baseUrl}/orders/${orderId}`);
    return {
      id: response.data.id,
      items: response.data.items.map((item: any) => ({
        food: new FoodModel(
          new FoodId(item.food.id),
          item.food.name,
          item.food.description,
          new Price(item.food.price),
          item.food.imageUrl,
          item.food.categoryId,
          item.food.isActive
        ),
        quantity: item.quantity,
      })),
      status: response.data.status,
    };
  }

  async createOrder(orderData: {
    items: Array<{ foodId: string; quantity: number }>;
  }): Promise<string> {
    const response = await axios.post(`${this.baseUrl}/orders`, orderData);
    return response.data.id;
  }

  async updateOrderStatus(
    orderId: string,
    status: "completed" | "cancelled"
  ): Promise<void> {
    await axios.patch(`${this.baseUrl}/orders/${orderId}/status`, { status });
  }

  async getAllOrders(): Promise<
    Array<{
      id: string;
      status: string;
      createdAt: Date;
    }>
  > {
    const response = await axios.get(`${this.baseUrl}/orders`);
    return response.data.map((order: any) => ({
      id: order.id,
      status: order.status,
      createdAt: new Date(order.createdAt),
    }));
  }

  async getPendingOrders(): Promise<
    Array<{
      id: string;
      createdAt: Date;
    }>
  > {
    const response = await axios.get(`${this.baseUrl}/orders?status=pending`);
    return response.data.map((order: any) => ({
      id: order.id,
      createdAt: new Date(order.createdAt),
    }));
  }
}

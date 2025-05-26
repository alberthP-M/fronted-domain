import { IFoodOrderRepository } from "../../application/repositories/IFoodOrderRepository";
import { FoodOrder } from "../../domain/aggregates/FoodOrder";
import { OrderApiClient } from "../api/OrderApiClient";

export class FoodOrderRepository implements IFoodOrderRepository {
  constructor(private orderClient: OrderApiClient) {}

  async findById(id: string): Promise<FoodOrder | null> {
    try {
      const orderData = await this.orderClient.getOrder(id);
      const order = new FoodOrder(orderData.id);

      // Reconstruir el agregado desde los datos persistentes
      orderData.items.forEach((item) => {
        order.addItem(item.food, item.quantity);
      });

      if (orderData.status === "completed") order.completeOrder();
      if (orderData.status === "cancelled") order.cancelOrder();

      return order;
    } catch (error) {
      console.error("Error finding food order:", error);
      return null;
    }
  }

  async save(aggregate: FoodOrder): Promise<void> {
    try {
      const events = aggregate.getUncommittedEvents();

      // Procesar eventos y persistir cambios
      console.log("Processing order events:", events);

      aggregate.clearEvents();
    } catch (error) {
      console.error("Error saving food order:", error);
      throw error;
    }
  }

  async getAll(): Promise<FoodOrder[]> {
    try {
      const ordersData = await this.orderClient.getAllOrders();
      return ordersData.map((data) => {
        const order = new FoodOrder(data.id);
        // ... reconstruir cada orden
        return order;
      });
    } catch (error) {
      console.error("Error getting all orders:", error);
      return [];
    }
  }

  async getPendingOrders(): Promise<FoodOrder[]> {
    try {
      const ordersData = await this.orderClient.getPendingOrders();
      return ordersData.map((data) => {
        const order = new FoodOrder(data.id);
        // ... reconstruir cada orden pendiente
        return order;
      });
    } catch (error) {
      console.error("Error getting pending orders:", error);
      return [];
    }
  }
}

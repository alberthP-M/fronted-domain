import { FoodOrder } from "../../domain/aggregates/FoodOrder";

export interface IFoodOrderRepository {
  findById(id: string): Promise<FoodOrder | null>;
  save(order: FoodOrder): Promise<void>;
  getAll(): Promise<FoodOrder[]>;
  getPendingOrders(): Promise<FoodOrder[]>;
}

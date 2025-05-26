import { IFoodRepository } from "../../application/repositories/IFoodRepository";
import { FoodModel } from "../../domain/entities/FoodModel";
import { FoodId } from "../../domain/value-objects/FoodId";
import { FoodApiClient } from "../api/FoodApiClient";

export class FoodRepository implements IFoodRepository {
  private apiClient: FoodApiClient;

  constructor(apiClient: FoodApiClient) {
    this.apiClient = apiClient;
  }
  findByCategory(categoryId: string): Promise<FoodModel[]> {
    throw new Error("Method not implemented.");
  }
  save(food: FoodModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: FoodId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: FoodId): Promise<FoodModel | null> {
    const foods = await this.apiClient.getFoods();
    return foods.find((food) => food.id.equals(id)) || null;
  }

  async findAll(): Promise<FoodModel[]> {
    return this.apiClient.getFoods();
  }

  // Implementar otros métodos...
}

import { IFoodRepository } from "../../application/repositories/IFoodRepository";
import { FoodModel } from "../../domain/entities/FoodModel";
import { FoodId } from "../../domain/value-objects/FoodId";
import { FoodApiClient } from "../api/FoodApiClient";

export class FoodRepository implements IFoodRepository {
  private apiClient: FoodApiClient;

  constructor(apiClient: FoodApiClient) {
    this.apiClient = apiClient;
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

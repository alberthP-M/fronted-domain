import { IFoodRepository } from "../../application/repositories/IFoodRepository";
import { FoodModel } from "../../domain/entities/FoodModel";
import { FoodId } from "../../domain/value-objects/FoodId";
import { FoodApiClient } from "../api/FoodApiClient";

export class FoodRepository implements IFoodRepository {
  private apiClient: FoodApiClient;

  constructor(apiClient: FoodApiClient) {
    this.apiClient = apiClient;
  }

  async findByCategory(categoryId: string): Promise<FoodModel[]> {
    const foods = await this.apiClient.getFoods();
    return foods.filter((food) => food.categoryId === categoryId);
  }

  async save(food: FoodModel): Promise<void> {
    try {
      // Si el food ya tiene ID, es una actualización
      if (food.id.value) {
        await this.apiClient.updateFood(food);
      } else {
        // Si no tiene ID, es una creación
        await this.apiClient.createFood(food);
      }
    } catch (error) {
      console.error("Error saving food:", error);
      throw new Error("Failed to save food");
    }
  }

  async delete(id: FoodId): Promise<void> {
    try {
      await this.apiClient.deleteFood(id);
    } catch (error) {
      console.error("Error deleting food:", error);
      throw new Error("Failed to delete food");
    }
  }

  async findById(id: FoodId): Promise<FoodModel | null> {
    try {
      const foods = await this.apiClient.getFoods();
      return foods.find((food) => food.id.equals(id)) || null;
    } catch (error) {
      console.error("Error finding food by id:", error);
      return null;
    }
  }

  async findAll(): Promise<FoodModel[]> {
    try {
      return await this.apiClient.getFoods();
    } catch (error) {
      console.error("Error finding all foods:", error);
      return [];
    }
  }
}

import { ICategoryFoodRepository } from "../../application/repositories/ICategoryFoodRepository";
import { CategoryFood } from "../../domain/aggregates/CategoryFood";
import { CategoryId } from "../../domain/value-objects/CategoryId";
import { CategoryApiClient } from "../api/CategoryApiClient";
import { FoodApiClient } from "../api/FoodApiClient";

export class CategoryFoodRepository implements ICategoryFoodRepository {
  constructor(
    private categoryClient: CategoryApiClient,
    private foodClient: FoodApiClient
  ) {}

  async findById(id: CategoryId): Promise<CategoryFood | null> {
    try {
      const category = await this.categoryClient.getCategory(id.value);
      return new CategoryFood(category);
    } catch (error) {
      console.error("Error finding category food:", error);
      return null;
    }
  }

  async save(aggregate: CategoryFood): Promise<void> {
    try {
      // Guardar eventos pendientes
      const events = aggregate.getUncommittedEvents();

      // Aquí iría la lógica para persistir los cambios
      // basados en los eventos generados
      console.log("Processing events:", events);

      aggregate.clearEvents();
    } catch (error) {
      console.error("Error saving category food:", error);
      throw error;
    }
  }

  async delete(id: CategoryId): Promise<void> {
    try {
      await this.categoryClient.deleteCategory(id.value);
      // También deberías manejar qué hacer con las comidas asociadas
    } catch (error) {
      console.error("Error deleting category food:", error);
      throw error;
    }
  }

  async getAll(): Promise<CategoryFood[]> {
    try {
      const categories = await this.categoryClient.getAllCategories();
      const allFoods = await this.foodClient.getFoods();

      return categories.map(
        (category) =>
          new CategoryFood(
            category,
            allFoods.filter((food) => food.categoryId === category.id.value)
          )
      );
    } catch (error) {
      console.error("Error getting all category foods:", error);
      return [];
    }
  }
}

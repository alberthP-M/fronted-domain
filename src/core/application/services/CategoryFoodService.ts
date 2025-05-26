import { ICategoryFoodRepository } from "../repositories/ICategoryFoodRepository";
import { CategoryFood } from "../../domain/aggregates/CategoryFood";
import { CategoryId } from "../../domain/value-objects/CategoryId";
import { FoodModel } from "../../domain/entities/FoodModel";

export class CategoryFoodService {
  constructor(private repository: ICategoryFoodRepository) {}

  async createCategoryWithFoods(category: CategoryFood): Promise<void> {
    await this.repository.save(category);
  }

  async addFoodToCategory(
    categoryId: CategoryId,
    food: FoodModel
  ): Promise<void> {
    const categoryFood = await this.repository.findById(categoryId);
    if (!categoryFood) throw new Error("Category not found");

    categoryFood.addFood(food);
    await this.repository.save(categoryFood);
  }

  async getCategoryWithActiveFoods(
    categoryId: CategoryId
  ): Promise<CategoryFood> {
    const categoryFood = await this.repository.findById(categoryId);
    if (!categoryFood) throw new Error("Category not found");

    return categoryFood;
  }
}

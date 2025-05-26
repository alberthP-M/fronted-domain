import { Category } from "../entities/Category";
import { FoodModel } from "../entities/FoodModel";
import { CategoryId } from "../value-objects/CategoryId";

export class CategoryFood {
  private readonly category: Category;
  private foods: FoodModel[] = [];

  constructor(category: Category, initialFoods: FoodModel[] = []) {
    this.category = category;
    this.foods = initialFoods.filter(
      (food) => food.categoryId === category.id.value
    );
  }

  // Métodos principales
  addFood(food: FoodModel): void {
    if (food.categoryId !== this.category.id.value) {
      throw new Error("Food does not belong to this category");
    }
    this.foods.push(food);
  }

  removeFood(foodId: string): void {
    this.foods = this.foods.filter((food) => food.id.value !== foodId);
  }

  getActiveFoods(): FoodModel[] {
    return this.foods.filter((food) => food.isActive);
  }

  // Accessors
  get id(): CategoryId {
    return this.category.id;
  }

  get name(): string {
    return this.category.name;
  }

  get allFoods(): FoodModel[] {
    return [...this.foods];
  }
}

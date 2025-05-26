import { Category } from "../entities/Category";
import { FoodModel } from "../entities/FoodModel";
import { CategoryId } from "../value-objects/CategoryId";
import { DomainEvent } from "../events/DomainEvent";

export class CategoryFood {
  private readonly category: Category;
  private foods: FoodModel[] = [];
  private events: DomainEvent[] = [];

  constructor(category: Category, initialFoods: FoodModel[] = []) {
    this.category = category;
    this.addInitialFoods(initialFoods);
  }

  private addInitialFoods(foods: FoodModel[]): void {
    foods.forEach((food) => {
      if (food.categoryId === this.category.id.value) {
        this.foods.push(food);
      }
    });
  }

  addFood(food: FoodModel): void {
    if (food.categoryId !== this.category.id.value) {
      throw new Error("Food does not belong to this category");
    }

    this.foods.push(food);
    this.events.push(new FoodAddedEvent(food, this.category.id));
  }

  removeFood(foodId: string): void {
    const foodToRemove = this.foods.find((food) => food.id.value === foodId);
    if (foodToRemove) {
      this.foods = this.foods.filter((food) => food.id.value !== foodId);
      this.events.push(new FoodRemovedEvent(foodToRemove, this.category.id));
    }
  }

  getActiveFoods(): FoodModel[] {
    return this.foods.filter((food) => food.isActive);
  }

  clearEvents(): void {
    this.events = [];
  }

  getUncommittedEvents(): DomainEvent[] {
    return [...this.events];
  }

  // Getters
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

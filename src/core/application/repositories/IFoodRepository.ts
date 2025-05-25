import { FoodModel } from "../../domain/entities/FoodModel";
import { FoodId } from "../../domain/value-objects/FoodId";

export interface IFoodRepository {
  findById(id: FoodId): Promise<FoodModel | null>;
  findAll(): Promise<FoodModel[]>;
  findByCategory(categoryId: string): Promise<FoodModel[]>;
  save(food: FoodModel): Promise<void>;
  delete(id: FoodId): Promise<void>;
}

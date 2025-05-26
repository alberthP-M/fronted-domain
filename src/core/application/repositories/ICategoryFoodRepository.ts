import { CategoryFood } from "../../domain/aggregates/CategoryFood";
import { CategoryId } from "../../domain/value-objects/CategoryId";

export interface ICategoryFoodRepository {
  findById(id: CategoryId): Promise<CategoryFood | null>;
  save(categoryFood: CategoryFood): Promise<void>;
  delete(id: CategoryId): Promise<void>;
  getAll(): Promise<CategoryFood[]>;
}

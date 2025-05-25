import { IFoodRepository } from "../repositories/IFoodRepository";
import { FoodModel } from "../../domain/entities/FoodModel";
import { FoodId } from "../../domain/value-objects/FoodId";
import { Price } from "../../domain/value-objects/Price";

export class FoodService {
  constructor(private readonly foodRepository: IFoodRepository) {}

  async createFood(food: FoodModel): Promise<void> {
    await this.foodRepository.save(food);
  }

  async updateFoodPrice(id: FoodId, newPrice: Price): Promise<void> {
    const food = await this.foodRepository.findById(id);
    if (!food) throw new Error("Food not found");

    food.changePrice(newPrice);
    await this.foodRepository.save(food);
  }

  async getActiveFoods(): Promise<FoodModel[]> {
    const allFoods = await this.foodRepository.findAll();
    return allFoods.filter((food) => food.isActive);
  }
}

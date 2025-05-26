import axios from "axios";
import { FoodModel } from "../../domain/entities/FoodModel";
import { Price } from "../../domain/value-objects/Price";
import { FoodId } from "../../domain/value-objects/FoodId";

export class FoodApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getFoods(): Promise<FoodModel[]> {
    const response = await axios.get(`${this.baseUrl}/foods`);
    return response.data.map(
      (item: any) =>
        new FoodModel(
          new FoodId(item.id),
          item.name,
          item.description,
          new Price(item.price),
          item.imageUrl,
          item.categoryId,
          item.isActive
        )
    );
  }

  async createFood(food: FoodModel): Promise<FoodModel> {
    const response = await axios.post(`${this.baseUrl}/foods`, {
      id: food.id.value,
      name: food.name,
      description: food.description,
      price: food.price.value,
      imageUrl: food.imageUrl,
      categoryId: food.categoryId,
      isActive: food.isActive,
    });

    return new FoodModel(
      new FoodId(response.data.id),
      response.data.name,
      response.data.description,
      new Price(response.data.price),
      response.data.imageUrl,
      response.data.categoryId,
      response.data.isActive
    );
  }

  async updateFood(food: FoodModel): Promise<FoodModel> {
    const response = await axios.put(`${this.baseUrl}/foods/${food.id.value}`, {
      name: food.name,
      description: food.description,
      price: food.price.value,
      imageUrl: food.imageUrl,
      categoryId: food.categoryId,
      isActive: food.isActive,
    });

    return new FoodModel(
      new FoodId(response.data.id),
      response.data.name,
      response.data.description,
      new Price(response.data.price),
      response.data.imageUrl,
      response.data.categoryId,
      response.data.isActive
    );
  }

  async deleteFood(id: FoodId): Promise<void> {
    await axios.delete(`${this.baseUrl}/foods/${id.value}`);
  }
}

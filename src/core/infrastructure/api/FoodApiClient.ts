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
}

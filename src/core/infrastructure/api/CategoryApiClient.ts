import axios from "axios";
import { Category } from "../../domain/entities/Category";
import { CategoryId } from "../../domain/value-objects/CategoryId";

export class CategoryApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getCategory(categoryId: string): Promise<Category> {
    const response = await axios.get(
      `${this.baseUrl}/categories/${categoryId}`
    );
    return new Category(
      new CategoryId(response.data.id),
      response.data.name,
      response.data.description,
      response.data.isActive
    );
  }

  async getAllCategories(): Promise<Category[]> {
    const response = await axios.get(`${this.baseUrl}/categories`);
    return response.data.map(
      (cat: any) =>
        new Category(
          new CategoryId(cat.id),
          cat.name,
          cat.description,
          cat.isActive
        )
    );
  }

  async createCategory(categoryData: {
    name: string;
    description: string;
  }): Promise<CategoryId> {
    const response = await axios.post(
      `${this.baseUrl}/categories`,
      categoryData
    );
    return new CategoryId(response.data.id);
  }

  async updateCategory(
    categoryId: string,
    updateData: {
      name?: string;
      description?: string;
      isActive?: boolean;
    }
  ): Promise<void> {
    await axios.put(`${this.baseUrl}/categories/${categoryId}`, updateData);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/categories/${categoryId}`);
  }
}

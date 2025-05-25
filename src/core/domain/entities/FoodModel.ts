import { FoodId } from "../value-objects/FoodId";
import { Price } from "../value-objects/Price";

export class FoodModel {
  constructor(
    public readonly id: FoodId,
    public name: string,
    public description: string,
    public price: Price,
    public imageUrl: string,
    public categoryId: string,
    public isActive: boolean = true
  ) {}

  // Métodos de negocio
  changePrice(newPrice: Price): void {
    this.price = newPrice;
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}

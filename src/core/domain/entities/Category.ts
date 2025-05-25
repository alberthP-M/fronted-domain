import { CategoryId } from "../value-objects/CategoryId";

export class Category {
  constructor(
    public readonly id: CategoryId,
    public name: string,
    public description: string,
    public isActive: boolean = true
  ) {}

  // Métodos de negocio
  updateName(newName: string): void {
    if (!newName.trim()) throw new Error("Category name cannot be empty");
    this.name = newName;
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}

import { FoodModel } from "../entities/FoodModel";
import { DomainEvent } from "./DomainEvent";

export class FoodCreated implements DomainEvent {
  public readonly occurredOn: Date;
  public readonly food: FoodModel;

  constructor(food: FoodModel) {
    this.occurredOn = new Date();
    this.food = food;
  }

  get eventName(): string {
    return "food.created";
  }
}

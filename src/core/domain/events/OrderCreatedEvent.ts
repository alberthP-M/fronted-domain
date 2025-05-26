import { DomainEvent } from "./DomainEvent";

export class OrderCreatedEvent implements DomainEvent {
  public readonly occurredOn: Date;
  public readonly eventName = "OrderCreated";

  constructor(public readonly orderId: string) {
    this.occurredOn = new Date();
  }
}

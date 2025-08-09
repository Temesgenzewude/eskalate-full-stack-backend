import { RestaurantEntity } from '../../entities/restaurant/restaurant.entity.js';

export class RestaurantRto {
  constructor(
    public id: string,
    public name: string,
    public address?: string,
  ) {}

  static fromEntity(entity: RestaurantEntity): RestaurantRto {
    return new RestaurantRto(entity.id, entity.name, entity.address);
  }

  static fromEntities(entities: RestaurantEntity[]): RestaurantRto[] {
    return entities.map((e) => RestaurantRto.fromEntity(e));
  }
}


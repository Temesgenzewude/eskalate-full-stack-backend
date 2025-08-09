import { FoodEntity } from '../../entities/food/food.entity.js';

export class FoodRto {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public restaurantId?: string,
    public description?: string,
  ) {}

  static fromEntity(entity: FoodEntity): FoodRto {
    return new FoodRto(
      entity.id,
      entity.name,
      entity.price,
      entity?.restaurantId,
      entity.description,
    );
  }

  static fromEntities(entities: FoodEntity[]): FoodRto[] {
    return entities.map((e) => FoodRto.fromEntity(e));
  }
}


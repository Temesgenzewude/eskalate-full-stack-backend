import { FoodDocument } from '../../models/food/food.schema.js';

export class FoodEntity {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public restaurantId?: string,
    public description?: string,
  ) {}

  static fromDocument(document: FoodDocument): FoodEntity {
    return new FoodEntity(
      document._id.toString(),
      document.name,
      document.price,
      document.restaurantId,
      document.description,
    );
  }

  static fromDocuments(documents: FoodDocument[]): FoodEntity[] {
    return documents.map((doc) => FoodEntity.fromDocument(doc));
  }
}


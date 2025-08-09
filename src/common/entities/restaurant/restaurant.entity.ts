import { RestaurantDocument } from '../../models/resturant/restaurant.schema.js';

export class RestaurantEntity {
  constructor(
    public id: string,
    public name: string,
    public address?: string,
  ) {}

  static fromDocument(document: RestaurantDocument): RestaurantEntity {
    return new RestaurantEntity(
      document._id.toString(),
      document.name,
      document.address,
    );
  }

  static fromDocuments(documents: RestaurantDocument[]): RestaurantEntity[] {
    return documents.map((doc) => RestaurantEntity.fromDocument(doc));
  }
}


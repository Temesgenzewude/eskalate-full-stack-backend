import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

@Schema({ timestamps: true })
export class Food {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: false, trim: true })
  restaurantId?: string;

  @Prop({ trim: true })
  description?: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);


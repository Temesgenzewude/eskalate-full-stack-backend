import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  address?: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

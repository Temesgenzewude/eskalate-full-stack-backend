import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from '../common/dtos/restaurant/create-restaurant.dto.js';
import { UpdateRestaurantDto } from '../common/dtos/restaurant/update-restaurant.dto.js';
import { RestaurantEntity } from '../common/entities/restaurant/restaurant.entity.js';
import {
  Restaurant,
  RestaurantDocument,
} from '../common/models/resturant/restaurant.schema.js';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(payload: CreateRestaurantDto): Promise<RestaurantEntity> {
    const created = await this.restaurantModel.create(payload);
    return RestaurantEntity.fromDocument(created);
  }

  async findAll(): Promise<RestaurantEntity[]> {
    const docs = await this.restaurantModel.find();
    return RestaurantEntity.fromDocuments(docs);
  }

  async findOne(id: string): Promise<RestaurantEntity> {
    const doc = await this.restaurantModel.findById(id);
    if (!doc) throw new NotFoundException('Restaurant not found');
    return RestaurantEntity.fromDocument(doc);
  }

  async update(
    id: string,
    payload: UpdateRestaurantDto,
  ): Promise<RestaurantEntity> {
    const doc = await this.restaurantModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw new NotFoundException('Restaurant not found');
    return RestaurantEntity.fromDocument(doc);
  }

  async remove(id: string): Promise<void> {
    const res = await this.restaurantModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Restaurant not found');
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFoodDto } from '../common/dtos/food/create-food.dto.js';
import { UpdateFoodDto } from '../common/dtos/food/update-food.dto.js';
import { FoodEntity } from '../common/entities/food/food.entity.js';
import { Food, FoodDocument } from '../common/models/food/food.schema.js';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<FoodDocument>,
  ) {}

  async create(payload: CreateFoodDto): Promise<FoodEntity> {
    const created = await this.foodModel.create(payload);
    return FoodEntity.fromDocument(created);
  }

  async findAll(filter?: { restaurantId?: string }): Promise<FoodEntity[]> {
    const mongoFilter: Record<string, unknown> = {};
    if (filter?.restaurantId) mongoFilter.restaurantId = filter.restaurantId;
    const docs = await this.foodModel.find(mongoFilter);
    return FoodEntity.fromDocuments(docs);
  }

  async findOne(id: string): Promise<FoodEntity> {
    const doc = await this.foodModel.findById(id);
    if (!doc) throw new NotFoundException('Food not found');
    return FoodEntity.fromDocument(doc);
  }

  async update(id: string, payload: UpdateFoodDto): Promise<FoodEntity> {
    const doc = await this.foodModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw new NotFoundException('Food not found');
    return FoodEntity.fromDocument(doc);
  }

  async remove(id: string): Promise<void> {
    const res = await this.foodModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Food not found');
  }
}

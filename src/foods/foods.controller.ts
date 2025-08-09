import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateFoodDto } from '../common/dtos/food/create-food.dto.js';
import { ParseObjectIdPipe } from '../common/pipes/parse-objectid.pipe.js';
import { UpdateFoodDto } from '../common/dtos/food/update-food.dto.js';
import { FoodRto } from '../common/rtos/food/food.rto.js';
import { FoodsService } from './foods.service.js';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  create(@Body() body: CreateFoodDto): Promise<FoodRto> {
    return this.foodsService.create(body).then(FoodRto.fromEntity);
  }

  @Get()
  findAll(@Query('restaurantId') restaurantId?: string): Promise<FoodRto[]> {
    return this.foodsService
      .findAll({ restaurantId })
      .then(FoodRto.fromEntities);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<FoodRto> {
    return this.foodsService.findOne(id).then(FoodRto.fromEntity);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateFoodDto,
  ): Promise<FoodRto> {
    return this.foodsService.update(id, body).then(FoodRto.fromEntity);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.foodsService.remove(id);
  }
}

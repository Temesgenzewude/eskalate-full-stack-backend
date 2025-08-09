import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRestaurantDto } from '../common/dtos/restaurant/create-restaurant.dto.js';
import { UpdateRestaurantDto } from '../common/dtos/restaurant/update-restaurant.dto.js';
import { ParseObjectIdPipe } from '../common/pipes/parse-objectid.pipe.js';
import { RestaurantRto } from '../common/rtos/restaurant/restaurant.rto.js';
import { RestaurantsService } from './restaurants.service.js';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() body: CreateRestaurantDto): Promise<RestaurantRto> {
    return this.restaurantsService.create(body).then(RestaurantRto.fromEntity);
  }

  @Get()
  findAll(): Promise<RestaurantRto[]> {
    return this.restaurantsService.findAll().then(RestaurantRto.fromEntities);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<RestaurantRto> {
    return this.restaurantsService.findOne(id).then(RestaurantRto.fromEntity);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateRestaurantDto,
  ): Promise<RestaurantRto> {
    return this.restaurantsService
      .update(id, body)
      .then(RestaurantRto.fromEntity);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.restaurantsService.remove(id);
  }
}

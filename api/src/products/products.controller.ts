import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TogglePublishedDto } from './dto/toggle-published.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('published')
  findPublished() {
    return this.productsService.findPublished();
  }

  @Get('related')
  findRelated(
    @Query('categoryId') categoryId: string,
    @Query('excludeId') excludeId: string,
    @Query('limit') limit?: string,
  ) {
    return this.productsService.findRelated(
      categoryId,
      excludeId,
      limit ? Number(limit) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Patch(':id/toggle-published')
  togglePublished(@Param('id') id: string, @Body() dto: TogglePublishedDto) {
    return this.productsService.togglePublished(id, dto.currentValue);
  }
}

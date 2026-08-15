import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BundlesService } from './bundles.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { UpdateBundleDto } from './dto/update-bundle.dto';
import { TogglePublishedDto } from './dto/toggle-published.dto';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bundles')
@UseGuards(JwtAuthGuard)
export class BundlesController {
  constructor(private readonly bundlesService: BundlesService) {}

  @Public()
  @Get()
  findAll() {
    return this.bundlesService.findAll();
  }

  @Public()
  @Get('published')
  findPublished() {
    return this.bundlesService.findPublished();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bundlesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBundleDto) {
    return this.bundlesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBundleDto) {
    return this.bundlesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bundlesService.remove(id);
  }

  @Patch(':id/toggle-published')
  togglePublished(@Param('id') id: string, @Body() dto: TogglePublishedDto) {
    return this.bundlesService.togglePublished(id, dto.currentValue);
  }
}

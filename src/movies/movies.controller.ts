import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const movie = await this.moviesService.findOne(parseInt(id));
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<any> {
    return this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<any> {
    const movie = await this.moviesService.update(parseInt(id), updateMovieDto);
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.moviesService.remove(parseInt(id));
    if (!result) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
  }
}

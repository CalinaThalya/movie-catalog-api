import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'typeorm/Movie';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<any> {
    return this.movieRepository.findOne(id);
  }

  async create(createMovieDto: CreateMovieDto): Promise<any> {
    const newMovie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(newMovie);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<any> {
    const movie = await this.movieRepository.findOne(id);
    if (!movie) {
      return null;
    }
    const updatedMovie = Object.assign(movie, updateMovieDto);
    return this.movieRepository.save(updatedMovie);
  }

  async remove(id: number): Promise<boolean> {
    const movie = await this.movieRepository.findOne(id);
    if (!movie) {
      return false;
    }
    await this.movieRepository.delete(id);
    return true;
  }
}

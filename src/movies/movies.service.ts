import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movies/entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from '../movies/dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie | undefined> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const newMovie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(newMovie);
  }

  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie | null> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      return null;
    }
    const updatedMovie = Object.assign(movie, updateMovieDto);
    return this.movieRepository.save(updatedMovie);
  }

  async remove(id: number): Promise<boolean> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      return false;
    }
    await this.movieRepository.delete(id);
    return true;
  }
}

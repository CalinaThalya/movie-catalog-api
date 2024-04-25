export class CreateMovieDto {
  title: string;
  year: number;
}

export class UpdateMovieDto {
  title?: string;
  year?: number;
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';


@Module({
  imports: [ConfigModule.forRoot(), AuthModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}

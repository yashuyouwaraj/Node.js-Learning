import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './posts/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl:60000,
      limit:5
    }]),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:"localhost",
      port:5432,
      username:'postgres',
      password:"1947",
      database:"Nest-js",
      entities:[Post,User], // array of enities that u want to register
      synchronize:true // dev mode
    }),
    PostsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

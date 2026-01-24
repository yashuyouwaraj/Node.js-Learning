import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { createPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';
import { Post as PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { UserRole } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { FindPostQueryDto } from './dto/find-posts-query-dto';
import { PaginatedResponse } from 'src/common/interface/paginated-response.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query() query:FindPostQueryDto):Promise<PaginatedResponse<PostEntity>>{
    return this.postsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe,PostExistsPipe) id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )
  async create(@Body() createPostData:createPostDto,@CurrentUser() user:any):Promise<PostEntity>{
    return this.postsService.create(createPostData,user)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
 async update(@Param('id',ParseIntPipe,PostExistsPipe) id:number,@Body() updatePostData:UpdatePostDto,@CurrentUser() user:any):Promise<PostEntity>{
    return this.postsService.update(id,updatePostData,user)
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id',ParseIntPipe,PostExistsPipe) id:number): Promise<void> {
    return this.postsService.remove(id);
  }
}

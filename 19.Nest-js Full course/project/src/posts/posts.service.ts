import { Injectable, NotFoundException } from '@nestjs/common';
import { Post as PostInterface } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: PostInterface[] = [
    {
      id: 1,
      title: 'First',
      content: 'First Post content',
      authorName: 'Yashu',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'second',
      content: 'second Post content',
      authorName: 'Aman',
      createdAt: new Date(),
    },
  ];

  findAll(): PostInterface[] {
    return this.posts;
  }

  findOne(id:number) : PostInterface{
    const singlePost = this.posts.find((post)=>post.id==id)
    if(!singlePost){
        throw new NotFoundException(`Post with ID ${id} is not found`)
    }
    return singlePost
  }
}

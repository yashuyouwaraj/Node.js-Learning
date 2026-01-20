import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, Post as PostInterface } from './interfaces/post.interface';

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

  findOne(id: number): PostInterface {
    const singlePost = this.posts.find((post) => post.id == id);
    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} is not found`);
    }
    return singlePost;
  }

  create(
    createPostData: Omit<PostInterface, 'id' | 'createdAt'>,
  ): PostInterface {
    const newPost: PostInterface = {
      id: this.getNextId(),
      ...createPostData,
      createdAt: new Date(),
    };

    this.posts.push(newPost);
    return newPost;
  }

  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }

  update(id:number,updatePostData:Partial<Omit<PostInterface, 'id' | 'createdAt'>>):PostInterface{
    const currentPostIndexToEdit = this.posts.findIndex(post=>post.id ===id)

    if(currentPostIndexToEdit ===-1){
      throw new NotFoundException(`Post with ID ${id} is not found`)
    }

    this.posts[currentPostIndexToEdit]={
      ...this.posts[currentPostIndexToEdit],
      ...updatePostData,
      updatedAt:new Date()
    }
    return this.posts[currentPostIndexToEdit]
  }

  remove(id:number) : {message:string}{
    const currentPostIndexToDelete=this.posts.findIndex((post)=>post.id===id)
    if(currentPostIndexToDelete ===-1){
      throw new NotFoundException(`Post with ID ${id} is not found`)
    }

    this.posts.splice(currentPostIndexToDelete,1)
    return {message: `Post with ID ${id} has been deleted`}
  }
}

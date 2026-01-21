import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { createPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,){}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }

 async findOne(id: number): Promise<Post> {
    const singlePost = await this.postRepository.findOneBy({id});
    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} is not found`);
    }
    return singlePost;
  }

  async create(createPostData: createPostDto): Promise<Post> {
    const newlycreatedPost= this. postRepository.create({
      title:createPostData.title,
      content:createPostData.content,
      authorName:createPostData.authorName,
    })
    return this.postRepository.save(newlycreatedPost)
  }

  async update(id:number,updatePostData:UpdatePostDto): Promise<Post> {
    const findPostToUpdate = await this.findOne(id)
    if(updatePostData.title){
      findPostToUpdate.title=updatePostData.title
    }
    if(updatePostData.content){
      findPostToUpdate.content=updatePostData.content
    }
    if(updatePostData.authorName){
      findPostToUpdate.authorName=updatePostData.authorName
    }
    return this.postRepository.save(findPostToUpdate)
  }

  async remove(id:number) : Promise<void>{
    const findpostToDelete=await this.findOne(id)
    await this.postRepository.remove(findpostToDelete)
  }
  
}

import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
  //injecting services from other module
  // hello module must export helloService
  // user module must import HelloModule
  constructor(private readonly helloService: HelloService){}

  getAllUsers(){
    return [
        {
            id:1,name:"Yashu"
        },
        {
            id:2,name:"Aman"
        },
        {
            id:3,name:"Youwaraj"
        },
    ]
  }

  getUserById(id:number){
    const user= this.getAllUsers().find((users)=>users.id===id)
    return user
  }

  getWelcomeMessage(userId:number){
    const user = this.getUserById(userId)
    if(!user){
        return "User not found!"
    }
    return this.helloService.getHelloWithName(user?.name)
  }
}

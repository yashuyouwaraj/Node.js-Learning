import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  controllers: [HelloController],
  providers: [HelloService],
  //   imports : [], // import other modules if needed
  // export services if needed in other modules
  exports:[HelloService]
})
export class HelloModule {}

import { Module } from '@nestjs/common';
import { CloduinaryProvider } from './cloudinary.provider';
import { CloduinaryService } from './cloudinary.service';

@Module({
  providers: [CloduinaryProvider, CloduinaryService],
  exports: [CloduinaryService],
})
export class CloudinaryModule {}

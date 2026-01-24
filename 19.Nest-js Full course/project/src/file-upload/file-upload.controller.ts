import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileUploadService } from './file-upload.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/roles-guard';

@Controller('file-upload')
export class FileUploadController {
    constructor(private readonly fileUploadService:FileUploadService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file:Express.Multer.File,
        @Body() UploadFileDto: UploadFileDto,
        @CurrentUser() user: User,
    ): Promise<any>{
        if(!file){
            throw new BadRequestException('File is required')
        }
        return this.fileUploadService.uploadFile(
            file,UploadFileDto.description,
            user,
        )
    }

    @Get()
    async findAll(){
        return this.fileUploadService.findAll()
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    async remove(@Param('id',ParseUUIDPipe) id:string){
        await this.fileUploadService.remove(id)
        return {
            message:'File delete Successfully'
        }
    }
}

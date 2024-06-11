import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { existsSync, createReadStream } from 'fs';

@Controller('images')
export class ImageController {
  private readonly uploadDir = join(process.cwd(), 'uploads', 'images');

  @Get(':filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = join(this.uploadDir, filename);
    if (!existsSync(imagePath)) {
      throw new NotFoundException(`Image ${filename} not found`);
    }

    const fileStream = createReadStream(imagePath);
    fileStream.pipe(res);
  }
}
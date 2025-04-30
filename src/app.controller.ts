import { Body, Controller, Delete, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CreateDataDto } from './dtos/create-data.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  @ApiOperation({ summary: 'Get data from cache' })
  async getData() {
    try {
      return await this.appService.getData();
    } catch (error) {
      console.log(error);
      return error as Error;
    }
  }
  @Post()
  @ApiOperation({ summary: 'Create data in cache' })
  async postData(@Body() createDataDto: CreateDataDto) {
    try {
      return await this.appService.postData(createDataDto);
    } catch (error) {
      console.log(error);
      return error as Error;
    }
  }
  @Delete()
  @ApiOperation({ summary: 'Delete data from cache' })
  async deleteData() {
    try {
      return await this.appService.deleteData();
    } catch (error) {
      console.log(error);
      return error as Error;
    }
  }
}
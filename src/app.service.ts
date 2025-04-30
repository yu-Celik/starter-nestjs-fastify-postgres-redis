import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CreateDataDto } from "./dtos/create-data.dto";

@Injectable()
export class AppService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }


  async getData(): Promise<string | undefined> {
    const value = await this.cacheManager.get<string>('key'); // ? Retrieve data from the cache
    return value ?? undefined;
  }

  async postData(createDataDto: CreateDataDto) {
    const { name } = createDataDto;
    await this.cacheManager.set('key', name); //  ? Set data in the cache
    return { message: 'Data created successfully' };
  }

  async deleteData() {
    await this.cacheManager.del('key'); // ? Delete data from the cache
    return { message: 'Data deleted successfully' };
  }

}
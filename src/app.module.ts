import { AuthModule } from '@app/modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '@configs/configuration';
import { DatabaseModule } from '@database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '@configs/app-options.constants';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync(RedisOptions),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule { }

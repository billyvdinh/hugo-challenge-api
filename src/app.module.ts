import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { join } from 'path';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { JsonBodyMiddleware } from './common/middleware/json-body.middleware';

import databaseConfig from './common/config/database.config';
import appConfig from './common/config/app.config';

import { HomeModule } from './modules/home/home.module';
import { ApplicationModule } from './modules/application/application.module';
import { InsurerModule } from './modules/insurer/insurer.module';
import { DependentModule } from './modules/dependent/dependent.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get('database.type'),
          url: configService.get('database.url'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          synchronize: configService.get('database.synchronize'),
          dropSchema: false,
          keepConnectionAlive: true,
          logging: configService.get('app.nodeEnv') !== 'production',
          entities: [join(__dirname, 'modules', '**/*.entity{.ts,.js}')],
          migrations: [],
          autoLoadEntities: true,
          extra: {
            // based on https://node-postgres.com/api/pool
            // max connection pool size
            max: configService.get('database.maxConnections'),
            ssl: configService.get('database.sslEnabled')
              ? {
                  rejectUnauthorized: configService.get(
                    'database.rejectUnauthorized',
                  ),
                  ca: configService.get('database.ca') ?? undefined,
                  key: configService.get('database.key') ?? undefined,
                  cert: configService.get('database.cert') ?? undefined,
                }
              : undefined,
          },
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    HomeModule,
    ApplicationModule,
    InsurerModule,
    DependentModule,
    VehicleModule,
  ],
  exports: [
    HomeModule,
    ApplicationModule,
    InsurerModule,
    DependentModule,
    VehicleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(JsonBodyMiddleware).forRoutes('*');
  }
}

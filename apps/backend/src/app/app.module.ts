import { Module } from '@nestjs/common';
import { SensorModule} from './sensor/sensor.module';
import SupabaseService from './sensor/supabase.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ SensorModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,"dist/apps", 'frontend'),
    }),
  ],
  providers: [SupabaseService],
  exports: [SupabaseService],
  controllers: [], 
})
export class AppModule {}

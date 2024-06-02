import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import {SupabaseService} from './supabase.service'

@Module({
  providers: [SensorService,SupabaseService],
  controllers: [SensorController],
})
export class SensorModule {}

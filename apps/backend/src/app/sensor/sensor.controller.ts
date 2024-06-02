import { Controller, Get ,Param, BadRequestException, Query } from '@nestjs/common';
import { SensorDto } from './sensor.dto';
import { SensorService } from './sensor.service';


@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get('latest')
  async getLatestSensorValues(): Promise<SensorDto[]> {
    return this.sensorService.getLatestSensorValues();
  }
  @Get('all')
  async getSensorValues(): Promise<SensorDto[]> {
    return this.sensorService.getSensorValues();
  }
  // @Get(':date')
  // async getDataByDate(@Param('date') date1: Date): Promise<any[]> {
  //   return this.sensorService.getDataByDate(date1); // Call the service method
  // }
  // ':startDate/:endDate'
  @Get()
  async getDataByDateRange(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    // @Param('startDate') startDate: Date,
    // @Param('endDate') endDate: Date,
  ): Promise<any[]> {
      return this.sensorService.getDataByDateRange(startDate, endDate);
    
  }
  
  @Get(':endpoint')
  async getSensorData(@Param('endpoint') endpoint: string): Promise<any[]> {
    switch (endpoint) {
      case 'percentoh':
        return this.sensorService.percentvalueoh();
      case 'percentlh':
        return this.sensorService.percentvaluelh();
      default:
        throw new Error('Invalid endpoint');
    }
  }

}
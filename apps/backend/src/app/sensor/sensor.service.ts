import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SensorDto } from './sensor.dto';

@Injectable()
export class SensorService {
  SupabaseService: any;
  constructor(private readonly supabaseService: SupabaseService) {}

  async getLatestSensorValues(): Promise<SensorDto[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('sensor_one')
      .select('srno, distance_cm,sensor_name,timestamp,litre,waterpercent,level')
      .order('timestamp', { ascending: false })
      .limit(10);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getSensorValues(): Promise<SensorDto[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('sensor_one')
      .select('srno, distance_cm,sensor_name,timestamp,litre,waterpercent,level')
      .order('timestamp', { ascending: false })

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getDataByDateRange(startDate: Date, endDate: Date): Promise<any[]> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('sensor_one')
        .select('timestamp,litre')
        //.range('timestamp::Date', [startDate.toISOString(), endDate.toISOString()]);
        .gte('timestamp::Date', startDate) // Greater than or equal to the start date
        .lte('timestamp:Date', endDate)// Less than or equal to the end date
        .order('timestamp', { ascending: true });
  
        console.log(data);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch data from Supabase: ${error.message}`);
    }
  }


  async percentvalueoh(): Promise<any[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('sensor_one')
      .select('waterpercent')
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async percentvaluelh(): Promise<any[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('sensor_two')
      .select('waterpercent,litre')
      .order('time_stamp', { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }


}


import { WatchInterface } from 'interfaces/watch';
import { GetQueryInterface } from 'interfaces';

export interface HealthCheckInterface {
  id?: string;
  heart_rate: boolean;
  spo2: boolean;
  watch_id: string;
  created_at?: any;
  updated_at?: any;

  watch?: WatchInterface;
  _count?: {};
}

export interface HealthCheckGetQueryInterface extends GetQueryInterface {
  id?: string;
  watch_id?: string;
}

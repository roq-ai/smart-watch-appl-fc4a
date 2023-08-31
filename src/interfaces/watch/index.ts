import { BluetoothInterface } from 'interfaces/bluetooth';
import { CustomerInterface } from 'interfaces/customer';
import { HealthCheckInterface } from 'interfaces/health-check';
import { ManufacturerInterface } from 'interfaces/manufacturer';
import { GetQueryInterface } from 'interfaces';

export interface WatchInterface {
  id?: string;
  model: string;
  dial: string;
  time_setting: string;
  manufacturer_id: string;
  created_at?: any;
  updated_at?: any;
  bluetooth?: BluetoothInterface[];
  customer?: CustomerInterface[];
  health_check?: HealthCheckInterface[];
  manufacturer?: ManufacturerInterface;
  _count?: {
    bluetooth?: number;
    customer?: number;
    health_check?: number;
  };
}

export interface WatchGetQueryInterface extends GetQueryInterface {
  id?: string;
  model?: string;
  dial?: string;
  time_setting?: string;
  manufacturer_id?: string;
}

import { WatchInterface } from 'interfaces/watch';
import { GetQueryInterface } from 'interfaces';

export interface BluetoothInterface {
  id?: string;
  connectivity: boolean;
  watch_id: string;
  created_at?: any;
  updated_at?: any;

  watch?: WatchInterface;
  _count?: {};
}

export interface BluetoothGetQueryInterface extends GetQueryInterface {
  id?: string;
  watch_id?: string;
}

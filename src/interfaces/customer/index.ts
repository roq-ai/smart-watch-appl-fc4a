import { WatchInterface } from 'interfaces/watch';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  watch_id: string;
  created_at?: any;
  updated_at?: any;

  watch?: WatchInterface;
  _count?: {};
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  watch_id?: string;
}

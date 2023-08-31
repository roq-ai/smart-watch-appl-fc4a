import { WatchInterface } from 'interfaces/watch';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ManufacturerInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  watch?: WatchInterface[];
  user?: UserInterface;
  _count?: {
    watch?: number;
  };
}

export interface ManufacturerGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}

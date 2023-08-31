interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'Team Member', 'Administrator'],
  tenantName: 'Manufacturer',
  applicationName: 'Smart Watch Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'View available watch models with their specifications.',
    'View health check facilities of watch models.',
    'Check Bluetooth connectivity of watch models.',
  ],
  ownerAbilities: [
    'Manage watch models',
    'Manage health check facilities',
    'Manage Bluetooth connectivity',
    'View watch models and specifications',
  ],
};

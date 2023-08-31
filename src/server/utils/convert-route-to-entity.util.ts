const mapping: Record<string, string> = {
  bluetooths: 'bluetooth',
  customers: 'customer',
  'health-checks': 'health_check',
  manufacturers: 'manufacturer',
  users: 'user',
  watches: 'watch',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

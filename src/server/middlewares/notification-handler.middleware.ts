import { getServerSession } from '@roq/nextjs';
import { NextApiRequest } from 'next';
import { NotificationService } from 'server/services/notification.service';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod, generateFilterByPathUtil } from 'server/utils';
import { prisma } from 'server/db';

interface NotificationConfigInterface {
  roles: string[];
  key: string;
  tenantPath: string[];
  userPath: string[];
}

const notificationMapping: Record<string, NotificationConfigInterface> = {
  'watch.create': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'new-watch-model-added',
    tenantPath: ['manufacturer', 'watch'],
    userPath: [],
  },
  'watch.update': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'watch-model-updated',
    tenantPath: ['manufacturer', 'watch'],
    userPath: [],
  },
  'watch.delete': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'watch-model-deleted',
    tenantPath: ['manufacturer', 'watch'],
    userPath: [],
  },
  'health_check.create': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'health-check-feature-added',
    tenantPath: ['manufacturer', 'watch', 'health_check'],
    userPath: [],
  },
  'health_check.update': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'health-check-feature-updated',
    tenantPath: ['manufacturer', 'watch', 'health_check'],
    userPath: [],
  },
  'health_check.delete': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'health-check-feature-deleted',
    tenantPath: ['manufacturer', 'watch', 'health_check'],
    userPath: [],
  },
  'bluetooth.create': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'bluetooth-feature-added',
    tenantPath: ['manufacturer', 'watch', 'bluetooth'],
    userPath: [],
  },
  'bluetooth.update': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'bluetooth-feature-updated',
    tenantPath: ['manufacturer', 'watch', 'bluetooth'],
    userPath: [],
  },
  'bluetooth.delete': {
    roles: ['owner', 'team-member', 'administrator'],
    key: 'bluetooth-feature-deleted',
    tenantPath: ['manufacturer', 'watch', 'bluetooth'],
    userPath: [],
  },
};

const ownerRoles: string[] = ['owner'];
const customerRoles: string[] = ['customer'];
const tenantRoles: string[] = ['owner', 'team-member', 'administrator'];

const allTenantRoles = tenantRoles.concat(ownerRoles);
export async function notificationHandlerMiddleware(req: NextApiRequest, entityId: string) {
  const session = getServerSession(req);
  const { roqUserId } = session;
  // get the entity based on the request url
  let [mainPath] = req.url.split('?');
  mainPath = mainPath.trim().split('/').filter(Boolean)[1];
  const entity = convertRouteToEntityUtil(mainPath);
  // get the operation based on request method
  const operation = convertMethodToOperation(req.method as HttpMethod);
  const notificationConfig = notificationMapping[`${entity}.${operation}`];

  if (!notificationConfig || notificationConfig.roles.length === 0 || !notificationConfig.tenantPath?.length) {
    return;
  }

  const { tenantPath, key, roles, userPath } = notificationConfig;

  const tenant = await prisma.manufacturer.findFirst({
    where: generateFilterByPathUtil(tenantPath, entityId),
  });

  if (!tenant) {
    return;
  }
  const sendToTenant = () => {
    console.log('sending notification to tenant', {
      notificationConfig,
      roqUserId,
      tenant,
    });
    return NotificationService.sendNotificationToRoles(key, roles, roqUserId, tenant.tenant_id);
  };
  const sendToCustomer = async () => {
    if (!userPath.length) {
      return;
    }
    const user = await prisma.user.findFirst({
      where: generateFilterByPathUtil(userPath, entityId),
    });
    console.log('sending notification to user', {
      notificationConfig,
      user,
    });
    await NotificationService.sendNotificationToUser(key, user.roq_user_id);
  };

  if (roles.every((role) => allTenantRoles.includes(role))) {
    // check if only  tenantRoles + ownerRoles
    await sendToTenant();
  } else if (roles.every((role) => customerRoles.includes(role))) {
    // check if only customer role
    await sendToCustomer();
  } else {
    // both company and user receives
    await Promise.all([sendToTenant(), sendToCustomer()]);
  }
}

interface IRouterLink {
  href: string;
  method?: string;
}

type IRouterReplacerLink = Record<string, string>;

export type IHateoasLinkNest = {
  [key: string]: IRouterLink | IHateoasLinkNest | undefined;
};

export interface IHateoasLink {
  _links: IHateoasLinkNest;
}

const userRoutes = {
  self: { href: '/users/:userId', method: 'GET' },
  update: { href: '/users/:userId', method: 'PATCH' },
  remove: { href: '/users/:userId', method: 'DELETE' },
};

const usersRoutes = {
  ...userRoutes,
  create: { href: '/users', method: 'POST' },
  list: { href: '/users', method: 'GET' },
};

const groupRoutes = {
  self: { href: '/groups/:groupId', method: 'GET' },
  update: { href: '/groups/:groupId', method: 'PATCH' },
  remove: { href: '/groups/:groupId', method: 'DELETE' },
};

const groupsRoutes = {
  ...groupRoutes,
  create: { href: '/groups', method: 'POST' },
  list: { href: '/groups', method: 'GET' },
};

const authRoutes = {
  login: { href: '/auth/login', method: 'POST' },
};

const routeGroup = {
  user: userRoutes,
  users: usersRoutes,
  group: groupRoutes,
  groups: groupsRoutes,
  auth: authRoutes,
};

const allRoutes = { ...usersRoutes, ...groupsRoutes, ...authRoutes };

// const allRoutes = Object.values(routeGroup).reduce(
//   (acc, group) => Object.assign(acc, group),
//   {},
// );

export class Routes {
  private static replacer(
    routerLink: IRouterLink,
    replacers?: IRouterReplacerLink,
  ): IRouterLink {
    let href = routerLink.href;

    const replacersArray = Object.keys(replacers || {});

    for (const param of replacersArray) {
      const value = replacers![param as keyof typeof replacers];
      href = href.replace(`:${param}`, value);
    }

    return { href, method: routerLink.method ?? 'GET' };
  }

  static router(key: keyof typeof allRoutes) {
    const link = allRoutes[key];
    link.href = link.href.substring(1);
    return link.href;
  }

  static hateoasGroup(
    key: keyof typeof routeGroup,
    replacers?: IRouterReplacerLink,
  ) {
    const routeGroups = routeGroup[key];

    for (const routeGroup in routeGroups) {
      const routeLink: IRouterLink = routeGroups[routeGroup];
      const routeValue = Routes.replacer(routeLink, replacers);

      if (routeValue.href.includes(':')) {
        delete routeGroups[routeGroup];
      } else {
        routeGroups[routeGroup] = routeValue;
      }
    }

    return routeGroups;
  }
}

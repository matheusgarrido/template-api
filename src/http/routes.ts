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

const roleRoutes = {
  self: { href: '/roles/:roleId', method: 'GET' },
  update: { href: '/roles/:roleId', method: 'PATCH' },
  remove: { href: '/roles/:roleId', method: 'DELETE' },
};

const rolesRoutes = {
  ...roleRoutes,
  create: { href: '/roles', method: 'POST' },
  list: { href: '/roles', method: 'GET' },
};

const authRoutes = {
  login: { href: '/auth/login', method: 'POST' },
};

const routeRole = {
  user: userRoutes,
  users: usersRoutes,
  role: roleRoutes,
  roles: rolesRoutes,
  auth: authRoutes,
};

const allRoutes = { ...usersRoutes, ...rolesRoutes, ...authRoutes };

// const allRoutes = Object.values(routeRole).reduce(
//   (acc, role) => Object.assign(acc, role),
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

  static hateoasRole(
    key: keyof typeof routeRole,
    replacers?: IRouterReplacerLink,
  ) {
    const routeRoles = routeRole[key];

    for (const routeRole in routeRoles) {
      const routeLink: IRouterLink = routeRoles[routeRole];
      const routeValue = Routes.replacer(routeLink, replacers);

      if (routeValue.href.includes(':')) {
        delete routeRoles[routeRole];
      } else {
        routeRoles[routeRole] = routeValue;
      }
    }

    return routeRoles;
  }
}

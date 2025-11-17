interface IRouterLink {
  href: string;
  method?: string;
}

type IRouterReplacerLink = Record<string, string>;

type IHateoasLinkNest = {
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

const authRoutes = {
  login: { href: '/auth/login', method: 'POST' },
};

const routeGroup = {
  user: userRoutes,
  users: usersRoutes,
  auth: authRoutes,
};

const allRoutes = { ...usersRoutes, ...authRoutes };

// const allRoutes = Object.values(routeGroup).reduce(
//   (acc, group) => Object.assign(acc, group),
//   {},
// );

export class Routes {
  static get(
    key: keyof typeof allRoutes,
    replacers?: IRouterReplacerLink,
  ): IRouterLink {
    const link = allRoutes[key];
    let href = link.href;

    const replacersArray = Object.keys(replacers || {});

    for (const param of replacersArray) {
      const value = replacers![param as keyof typeof replacers];
      href = href.replace(`:${param}`, value);
    }

    return { href, method: link.method ?? 'GET' };
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
      const routeKey = routeGroup as keyof typeof allRoutes;
      const routeValue = Routes.get(routeKey, replacers);

      if (routeValue.href.includes(':')) {
        delete routeGroups[routeGroup];
      } else {
        routeGroups[routeGroup] = routeValue;
      }
    }

    return routeGroups;
  }
}

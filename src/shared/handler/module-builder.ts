import { ModuleMetadata } from '@nestjs/common';

interface ListItem {
  controller?: any;
  gateway: any;
  usecase: any;
}

export class ModuleBuilder {
  public readonly metadata: ModuleMetadata;

  constructor(ListItem: ListItem[], Repositories: any[]) {
    const Usecases = ListItem.map((item) => item.usecase);
    const Gateways = ListItem.map((item) => item.gateway);
    const Controllers = ListItem.map((item) => item.controller).filter(Boolean);

    this.metadata = {
      providers: [...Usecases, ...Repositories, ...Gateways],
      controllers: Controllers,
      exports: Usecases,
    };
  }
}

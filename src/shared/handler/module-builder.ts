import { ModuleMetadata, Provider } from '@nestjs/common';

interface ListItem {
  controller?: any;
  gateway: any;
  usecase: any;
}

export class ModuleBuilder {
  public readonly metadata: ModuleMetadata;

  constructor(
    ListItem: ListItem[],
    Repositories?: any[],
    InfraProviders?: Provider[],
  ) {
    const Usecases = ListItem.map((item) => item.usecase);
    const Gateways = ListItem.map((item) => item.gateway);
    const Controllers = ListItem.map((item) => item.controller).filter(Boolean);

    this.metadata = {
      providers: [
        ...Usecases,
        ...(Repositories ?? []),
        ...Gateways,
        ...(InfraProviders ?? []),
      ],
      controllers: Controllers,
      exports: Usecases,
    };
  }
}

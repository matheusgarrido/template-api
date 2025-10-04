import { ModuleMetadata, Provider } from '@nestjs/common';
import { AuthModule } from '@modules/index';

interface ListItem {
  controller?: any;
  gateway: any;
  usecase: any;
}

interface ModuleItems {
  Repositories?: any[];
  InfraProviders?: Provider[];
}

export class ModuleBuilder {
  public readonly metadata: ModuleMetadata;

  constructor(
    moduleName: string,
    ListItem: ListItem[],
    ModuleItems: ModuleItems = {},
  ) {
    const Usecases = ListItem.map((item) => item.usecase);
    const Gateways = ListItem.map((item) => item.gateway);
    const Controllers = ListItem.map((item) => item.controller).filter(Boolean);

    const Imports: any[] = [];
    if (moduleName !== 'auth') Imports.push(AuthModule);

    this.metadata = {
      imports: Imports,
      providers: [
        ...Usecases,
        ...(ModuleItems.Repositories ?? []),
        ...Gateways,
        ...(ModuleItems.InfraProviders ?? []),
      ],
      controllers: Controllers,
      exports: [...Usecases, ...(ModuleItems.InfraProviders ?? [])],
    };
  }
}

import { ModuleMetadata, Provider } from '@nestjs/common';
import { AuthModule } from '@modules/index';
import { AbstractAdapter } from '@shared/protocols/adapter.protocol';

interface UsecaseListItem {
  gateway: any;
  usecase: any;
}
interface HttpLIstItem {
  controller: any;
  adapter: any;
}

interface ModuleItems {
  Repositories?: any[];
  InfraProviders?: Provider[];
}

export class ModuleBuilder {
  public readonly metadata: ModuleMetadata;

  constructor(
    moduleName: string,
    HttpLIstItems: HttpLIstItem[],
    UsecaseListItems: UsecaseListItem[] = [],
    ModuleItems: ModuleItems = {},
  ) {
    const { InfraProviders, Repositories } = ModuleItems;

    const Usecases: any[] = [];
    const Gateways: any[] = [];
    const Controllers: any[] = [];
    UsecaseListItems.map((item) => {
      Usecases.push(item.usecase);
      Gateways.push(item.gateway);
    });

    const Adapters: AbstractAdapter[] = [];
    HttpLIstItems.map((item) => {
      Adapters.push(item.adapter);
      Controllers.push(item.controller);
    });

    const Imports: any[] = [];
    if (moduleName !== 'auth') Imports.push(AuthModule);

    this.metadata = {
      imports: Imports,
      providers: [
        ...Usecases,
        ...Gateways,
        ...(Repositories ?? []),
        ...(InfraProviders ?? []),
        ...Adapters,
      ],
      controllers: Controllers as any,
      exports: [...Usecases, ...Adapters, ...(InfraProviders ?? [])],
    };
  }
}

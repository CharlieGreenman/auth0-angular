import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthClientConfig, AuthConfig, AuthConfigService } from './auth.config';
import { AuthGuard } from './auth.guard';
import { AuthClient, Auth0ClientFactory, Auth0ClientService } from './auth.client';

@NgModule()
export class AuthModule {
  /**
   * Initialize the authentication module system. Configuration can either be specified here,
   * or by calling AuthClientConfig.set (perhaps from an APP_INITIALIZER factory function).
   * @param config The optional configuration for the SDK.
   */
  static forRoot(config?: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        {
          provide: AuthConfigService,
          useValue: config,
        },
        {
          provide: Auth0ClientService,
          useFactory: Auth0ClientFactory.createClient,
          deps: [AuthClientConfig],
        },
        AuthClient
      ],
    };
  }
}

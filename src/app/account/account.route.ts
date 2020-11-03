import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountGuard } from './services/account.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

const accountRouterConfig: Routes = [
    {
        path: '', component: AccountAppComponent,
        children: [
            { path: 'login', component: LoginComponent, canActivate: [AccountGuard] },
            { path: 'register', component: RegisterComponent, canDeactivate: [AccountGuard], canActivate: [AccountGuard] },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(accountRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule { }
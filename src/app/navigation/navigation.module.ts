import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        FooterComponent,
        HomeComponent,
        MenuComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FooterComponent,
        HomeComponent,
        MenuComponent,
        NotFoundComponent
    ]
})
export class NavigationModule { }
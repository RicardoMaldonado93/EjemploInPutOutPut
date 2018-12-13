import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlumnoComponent } from './shared/alumno/alumno.component';
import { ListadoCursoComponent } from './feature/listado-curso/listado-curso.component';
import { CursoComponent } from './feature/curso-item/curso-item.component';
import { AppRoutesModule } from './app-routes.module';
import { MenuComponent } from './core/menu/menu.component';
import { DocenteComponent } from './shared/docente/docente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuComponent,
    AppComponent,  
    AlumnoComponent,
    ListadoCursoComponent,
    DocenteComponent,
    CursoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

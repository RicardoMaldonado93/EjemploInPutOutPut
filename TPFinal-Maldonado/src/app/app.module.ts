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
import {NgxMaskModule} from 'ngx-mask';
import { ListadoAlumnosComponent } from './feature/listado-alumnos/listado-alumnos.component';
import { AlumnoItemComponent } from './feature/alumno-item/alumno-item.component';



@NgModule({
  declarations: [
    MenuComponent,
    AppComponent,  
    AlumnoComponent,
    ListadoCursoComponent,
    DocenteComponent,
    CursoComponent,
    MenuComponent,
    ListadoAlumnosComponent,
    AlumnoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

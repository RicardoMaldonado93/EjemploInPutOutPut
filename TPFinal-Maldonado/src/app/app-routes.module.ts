import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CursoModuleModule  } from './feature/curso-module/curso-module.module';
import { AlumnoComponent } from './shared/alumno/alumno.component';
import { CursoComponent } from './feature/curso-item/curso-item.component';
import { ListadoCursoComponent } from './feature/listado-curso/listado-curso.component';
import { DocenteComponent } from './shared/docente/docente.component';
import { ListadoAlumnosComponent } from './feature/listado-alumnos/listado-alumnos.component';
import { AlumnoItemComponent } from './feature/alumno-item/alumno-item.component';

const ROUTES: Routes = [
                          { path:"alumno", component: AlumnoComponent},
                          { path:"curso/:id", component: CursoComponent},
                          { path:"cursos", component: ListadoCursoComponent },
                          { path:"docente/:id", component: DocenteComponent},
                          { path:"listado-alumnos", component:ListadoAlumnosComponent},
                          { path:"alumno/:doc", component: AlumnoItemComponent},
                          { path: '**', redirectTo: '' },
                        ]; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot( ROUTES ),
  ],

  providers:[{
          provide : LocationStrategy,
          useClass : HashLocationStrategy
  }],
  
  exports: [ RouterModule ]
})
export class AppRoutesModule { }

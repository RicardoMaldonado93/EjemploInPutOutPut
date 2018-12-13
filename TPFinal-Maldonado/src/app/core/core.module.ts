import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { Routes , RouterModule, ActivatedRoute } from '@angular/router';
import { AlumnoComponent} from '../shared/alumno/alumno.component';
import { AppComponent } from '../app.component';

const ROUTES : Routes = [{path:'alumno/:legajo', component: AlumnoComponent },
{path:'', component: AppComponent}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports : [RouterModule],
  declarations: [MenuComponent]
})
export class CoreModule { 

  constructor(){}
}

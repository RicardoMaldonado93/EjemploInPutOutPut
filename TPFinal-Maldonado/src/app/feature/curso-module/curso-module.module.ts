import { NgModule, Input ,Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCursoComponent } from '../listado-curso/listado-curso.component';
import { CursoService } from 'src/app/core/service/curso.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ ListadoCursoComponent ],
  providers:[CursoService],
  exports : [ ListadoCursoComponent ]
})
export class CursoModuleModule { 
  
}

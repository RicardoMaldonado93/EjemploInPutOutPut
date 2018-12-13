import { Component, Output, Input } from '@angular/core';
import { ICurso } from '../../model/interfaces/icurso';
import { CursoService } from '../../core/service/curso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listado-curso',
  templateUrl: './listado-curso.component.html',
  styleUrls: ['./listado-curso.component.css'],
  providers:[CursoService]
})
export class ListadoCursoComponent {

  @Input() ListaCursos:Array<ICurso>;
  @Output() lista:Array<ICurso> = [];

  public id: string;
  public Cursos : ICurso;


  constructor(private route: ActivatedRoute, private r:Router, private service: CursoService ) {
    this.route.params.subscribe(
      params =>this.id = params['id']
    );
    
   }

  ngOnInit() {
  
   this.service.getCurso().subscribe( resp => { this.ListaCursos = resp.body; });

  }
  
  onSelect(param){
    
    this.r.navigate(['/curso', param.id]);
  }
}

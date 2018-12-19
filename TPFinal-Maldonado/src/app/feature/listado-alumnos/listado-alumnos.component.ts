import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/core/service/alumno.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.css']
})
export class ListadoAlumnosComponent implements OnInit {

  listaAlumnos=[];
  leg:string;
  cargada: boolean = false;

  constructor(private route: ActivatedRoute, private r:Router, private service: AlumnoService) { 
       
  }

  ngOnInit() {
    this.service.AlumnosInscriptos().subscribe(resp=>{ this.listaAlumnos = resp.body; if(this.listaAlumnos.length > 0){this.cargada = true}; console.log( resp.body)});
  }

}

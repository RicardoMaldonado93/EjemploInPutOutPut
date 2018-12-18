import {EnumEstado} from "../Enums/enum-estado.enum";
import { DatePipe } from "@angular/common";

export interface ICurso {

    /*id:number;
    curso:string;
    inicio:Date;
    finalizacion: Date;
    estado:EnumEstado;
    profesor:string;*/
    id: number;
    titulo: string;
    fechaInicio: number;
    fechaFin: number;
    asistentes: string[];
    profesor: string[];
    laboratorio: number;
    estado: number;
    precio:number;
}

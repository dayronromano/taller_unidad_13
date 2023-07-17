import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistroInscripcionesComponent } from '../registro-inscripciones/registro-inscripciones.component';

@Component({
  selector: 'app-listar-inscripciones',
  templateUrl: './listar-inscripciones.component.html',
  styleUrls: ['./listar-inscripciones.component.css']
})
export class ListarInscripcionesComponent implements OnInit {

  cursos: any[] = [];
  estudiantes: any[] = [];
  cupos: number = 0;
  estudiantesActivos: any[] = [];
  cursosForm!: FormGroup;
  displayedColumns: string[] = ['inscripcion_id', 'inscripcion_fechaCreacion', 'estudiante_id', 'estudiante_nombres', 'estudiante_apellidos', 'inscripcion_estado', 'acciones'];

  constructor(
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.cursosForm = this.formBuilder.group({
      curso_id: ['', [Validators.required]],
    });
  }

  get cupoLleno(): boolean {
    return this.estudiantes.length >= this.cupos;
  }



  ngOnInit(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (response: any) => {
        this.cursos = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  consultarEstudiantes() {
    const curso_id = this.cursosForm.value.curso_id;

    if (curso_id) {
      this.inscripcionesService.obtenerInscripciones(curso_id).subscribe({
        next: (response: any) => {
          this.estudiantes = response.data.estudiantes;
          this.cupos = response.data.cupo;
          this.estudiantesActivos = this.estudiantes.filter(estudiante => estudiante.inscripcion_estado == 1);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.cursosForm.markAllAsTouched();
    }
  }

  registrarEstudiantes() {
    const curso_id = this.cursosForm.value.curso_id;
    const dialogRef = this.dialog.open(RegistroInscripcionesComponent, {
      width: '500px',
      data: { curso_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.consultarEstudiantes();
    });
  }

  inhabilitarEstudiante(inscripcion: any) {
    const estado = (inscripcion.inscripcion_estado == 1)? 2 : 1;
    this.inscripcionesService.actualizarInscripcion(inscripcion.inscripcion_id, { estado }).subscribe({
      next: (response: any) => {
        this.consultarEstudiantes();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}

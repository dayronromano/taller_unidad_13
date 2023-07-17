import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-registro-inscripciones',
  templateUrl: './registro-inscripciones.component.html',
  styleUrls: ['./registro-inscripciones.component.css']
})
export class RegistroInscripcionesComponent implements OnInit {
  registerForm!: FormGroup;
  defaultSelected = '';

  estudiantes: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inscripcionesService: InscripcionesService,
    private estudiantesService: EstudiantesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistroInscripcionesComponent>
  ) {

    this.registerForm = this.formBuilder.group({
      estudiante_id: ['', [Validators.required]],
      curso_id: [this.data.curso_id]
    });
  }

  ngOnInit(): void {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (response: any) => {
        this.estudiantes = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit(): void {

    if (this.registerForm.value.estudiante != '') {

      const inscripcion = {
        estudianteId: this.registerForm.value.estudiante_id,
        cursoId: this.registerForm.value.curso_id,
        estado: 1
      }

      this.inscripcionesService.registrarInscripcion(inscripcion).subscribe({
        next: (response: any) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.log(error);
          alert(error.error.message);
        }
      });
    } else {
      alert('Debe seleccionar un estudiante');
    }
  }
}

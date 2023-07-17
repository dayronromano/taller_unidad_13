import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-curso',
  templateUrl: './registrar-curso.component.html',
  styleUrls: ['./registrar-curso.component.css']
})
export class RegistrarCursoComponent implements OnInit {

  editForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CursosService: CursosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistrarCursoComponent>
  ) {

    this.editForm = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.,-_ñÑ ]*$')]],
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.,-_ñÑ ]*$')]],
      cupo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern('^[0-9]*$')]],
      horario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.,-_ñÑ ]*$')]],
      profesor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.,-_ñÑ ]*$')]]
    });
  }

  ngOnInit(): void {
    const curso = this.data.id;
    if (curso) {
      this.CursosService.consultarCurso(curso).subscribe(
        (response: any) => {
          const cursoData = response.data[0];
          console.log(cursoData);
          this.editForm.setValue({
            id: cursoData.curso_id,
            nombre: cursoData.curso_nombre,
            descripcion: cursoData.curso_descripcion,
            cupo: cursoData.curso_cupo,
            horario: cursoData.curso_horario,
            profesor: cursoData.curso_profesor,
          });
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      this.editForm.setValue({
        id: '',
        nombre: '',
        descripcion: '',
        cupo: '',
        horario: '',
        profesor: '',
      });
    }
  }


  onSubmit(): void {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      const curso = {
        nombre: this.editForm.value.nombre,
        descripcion: this.editForm.value.descripcion,
        cupo: Number(this.editForm.value.cupo),
        horario: this.editForm.value.horario,
        profesor: this.editForm.value.profesor
      }
      if (this.editForm.value.id == '') {
        this.CursosService.registrarCurso(curso).subscribe({
          next: (response: any) => {
            console.log(response);
            alert("Estudiante registrado correctamente");
            this.dialogRef.close();

          },
          error: (error) => {
            if (error.error?.message instanceof Array) {
              let errorMessage = '';
              error.error.message.forEach((err: any, index: number) => {
                errorMessage += `${index + 1}. ${err} \n`;
              });
              alert(errorMessage);
            } else {
              alert("Ha ocurrido un error desconocido");
            }
          }
        });
      } else {
        this.CursosService.actualizarCurso(this.editForm.value.id, curso).subscribe({
          next: (response: any) => {
            alert('Curso actualizado correctamente');
            this.dialogRef.close();
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}

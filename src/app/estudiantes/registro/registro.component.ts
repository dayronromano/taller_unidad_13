import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  editForm!: FormGroup;
  defaultSelected = '';

  tiposIdentificacion = [
    {value: 1, viewValue: 'Cédula de ciudadanía'},
    {value: 2, viewValue: 'Tarjeta de identidad'},
    {value: 3, viewValue: 'Pasaporte'},
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private estudiantesService: EstudiantesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistroComponent>
  ) {

    this.editForm = this.formBuilder.group({
      id: [''],
      tipoIdentificacion:['', [Validators.required]],
      numeroIdentificacion:['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')]],
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      linkedin: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern('^https://linkedin.com/in/[a-zA-Z0-9_.+-]*$')]],
      github: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern('^https://github.com/[a-zA-Z0-9_.+-]*$')]]
    });
  }

  ngOnInit(): void {
    const estudiante = this.data?.id;
    if (estudiante) {
      this.estudiantesService.consultarEstudiante(estudiante).subscribe(
        (response: any) => {
          const estudianteData = response.data[0];
          this.defaultSelected = estudianteData.estudiante_tipoIdentificacion;
          this.editForm.setValue({
            id: estudianteData.estudiante_id,
            tipoIdentificacion: this.defaultSelected ,
            numeroIdentificacion: estudianteData.estudiante_numeroIdentificacion,
            nombres: estudianteData.estudiante_nombres,
            apellidos: estudianteData.estudiante_apellidos,
            celular: estudianteData.estudiante_celular,
            correo: estudianteData.estudiante_correo,
            linkedin: estudianteData.estudiante_linkedin,
            github: estudianteData.estudiante_github,
          });
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      this.editForm.setValue({
        id: '',
        tipoIdentificacion: '',
        numeroIdentificacion: '',
        nombres: '',
        apellidos: '',
        celular: '',
        correo: '',
        linkedin: 'https://linkedin.com/in/',
        github: 'https://github.com/',
      });
    }
  }


  onSubmit(): void {
    if (this.editForm.valid) {
      const estudiante = {
        nombres: this.editForm.value.nombres,
        tipoIdentificacion: Number(this.editForm.value.tipoIdentificacion),
        numeroIdentificacion: Number(this.editForm.value.numeroIdentificacion),
        apellidos: this.editForm.value.apellidos,
        celular: Number(this.editForm.value.celular),
        correo: this.editForm.value.correo,
        linkedin: this.editForm.value.linkedin,
        github: this.editForm.value.github,
      }
      if (this.editForm.value.id == '') {
        this.estudiantesService.registrarEstudiante(estudiante).subscribe({
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
        this.estudiantesService.actualizarEstudiante(this.editForm.value.id, estudiante).subscribe({
          next: (response: any) => {
            alert('Estudiante actualizado correctamente');
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

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarCursoComponent } from '../registrar-curso/registrar-curso.component';
import { VerCursoComponent } from '../ver-curso/ver-curso.component';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit, AfterViewInit {

  cursos: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'cupo', 'horario', 'profesor', 'estado', 'fechaCreacion', 'acciones'];
  dataSource = new MatTableDataSource<any>(this.cursos);

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (response: any) => {
        this.cursos = response.data;
        this.dataSource = new MatTableDataSource<any>(this.cursos);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  verCurso(curso: number) {
    console.log(curso);
    const dialogRef = this.dialog.open(VerCursoComponent, {
      width: '500px',
      data: { id: curso }
    });

  }

  abrirDialogoEditar(curso?: number) {
    const dialogRefEdit = this.dialog.open(RegistrarCursoComponent, {
      width: '500px',
      data: { id: curso }
    });

    dialogRefEdit.afterClosed().subscribe(result => {

      this.cursosService.obtenerCursos().subscribe(
        (response: any) => {
          this.cursos = response.data;
          this.dataSource = new MatTableDataSource<any>(this.cursos);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  inhabilitarCurso(curso: any) {
    const id = curso.curso_id;
    const data = {
      estado: (curso.curso_estado == 'Inactivo') ? 'Activo' : 'Inactivo'
    }

    this.cursosService.inhabilitarCurso(id, data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.ngOnInit();
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

}

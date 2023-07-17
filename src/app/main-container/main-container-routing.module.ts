import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { PerfilComponent } from '../usuarios/perfil/perfil.component';
import { AyudaComponent } from '../usuarios/ayuda/ayuda.component';
import { MicuentaComponent } from '../usuarios/micuenta/micuenta.component';
import { ConsultaComponent } from '../estudiantes/consulta/consulta.component';
import { ListarCursosComponent } from '../cursos/listar-cursos/listar-cursos.component';
import { ListarInscripcionesComponent } from '../inscripciones/listar-inscripciones/listar-inscripciones.component';

const routes: Routes = [
  {
    path: 'main',
    component: TemplateComponent,
    children: [
      { path: 'perfil', component: PerfilComponent },
      { path: 'ayuda', component: AyudaComponent },
      { path: 'micuenta', component: MicuentaComponent },
      { path: 'consultar-estudiantes', component: ConsultaComponent },
      { path: 'consultar-cursos', component: ListarCursosComponent },
      { path: 'inscripciones', component: ListarInscripcionesComponent },
      { path: '**', redirectTo: '/perfil' }  // Redirige todas las rutas no encontradas a '/perfil'
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContainerRoutingModule { }

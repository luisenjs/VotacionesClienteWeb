import { Component } from '@angular/core';
import { PapeletaComponent } from '../../component/papeleta/papeleta.component';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { SeleccionPapeletaComponent } from '../../component/seleccion-papeleta/seleccion-papeleta.component';
import { CrearPapeletaComponent } from '../../component/crear-papeleta/crear-papeleta.component';

@Component({
  selector: 'app-papeletas',
  standalone: true,
  imports: [PapeletaComponent, SeleccionPapeletaComponent, CrearPapeletaComponent],
  templateUrl: './papeletas.component.html',
  styleUrl: './papeletas.component.css'
})
export class PapeletasComponent {

  tipo = "";

  constructor(private modal: ModalService, private router: Router) { }

  seleccionarPapeleta(event: Event): void {
    event.preventDefault();
    this.modal.open("seleccion");
  }

  crearPapeleta(tipo: string){
    console.log(tipo);
    this.tipo = tipo;
    //this.router.navigate(['papeletas/agregar'])
    this.modal.open("creacion");
  }

}

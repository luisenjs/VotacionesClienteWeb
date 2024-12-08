import { Component } from '@angular/core';
import { PapeletaComponent } from '../../component/papeleta/papeleta.component';

@Component({
  selector: 'app-papeletas',
  standalone: true,
  imports: [PapeletaComponent],
  templateUrl: './papeletas.component.html',
  styleUrl: './papeletas.component.css'
})
export class PapeletasComponent {

}

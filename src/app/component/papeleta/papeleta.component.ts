import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-papeleta',
  standalone: true,
  imports: [],
  templateUrl: './papeleta.component.html',
  styleUrl: './papeleta.component.css'
})
export class PapeletaComponent {

  @Input() nombre!: string;

}

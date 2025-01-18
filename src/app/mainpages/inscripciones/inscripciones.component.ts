import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { DataService } from '../../services/data/data.service';
import { TablaComponent } from "../../component/tabla/tabla.component";
import { ConfirmationComponent } from '../../component/confirmation/confirmation.component';
import { MasinformacionComponent } from '../../component/masinformacion/masinformacion.component';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, TablaComponent, ConfirmationComponent, MasinformacionComponent],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {

  inscripcioncampo: any[] = ["nombres", "apellidos", "genero", "canton_id", "parroquia_id", "recinto_id", "acciones"];
  inscripcionacciones: any[] = [{ icon: "fa-solid fa-eye", callback: (row: any) => this.verInfo(row) }, { icon: "fa-regular fa-circle-check", callback: (row: any) => this.aceptarInscripcion(row) }, { icon: "fa-regular fa-circle-xmark", callback: (row: any) => this.rechazarInscripcion(row) }];
  inscripcion: any[] = [];
  inscripcionfilter: any = { nombre: "", genero: "", fecha: "", provincia: "", canton: "", parroquia: "", recinto: "" };

  isDataLoaded: boolean = false;

  pendingElement: any = null;

  cantones: any[] = [];
  parroquias: any[] = [];
  recintos: any[] = [];

  constructor(private modal: ModalService, private data: DataService, private auth: AuthService) {
    setInterval(() => { this.ngOnInit() }, 3000)
  }

  ngOnInit(): void {
    forkJoin({
      cantones: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/cantones'),
      parroquias: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/parroquias'),
      recintos: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/recintos-electorales'),
      usuarios: this.data.getData<any[]>('https://api-observacion-electoral.frative.com/api/usuarios')
    }).subscribe((result) => {
      this.cantones = result.cantones;
      this.parroquias = result.parroquias;
      this.recintos = result.recintos;
      this.inscripcion = result.usuarios.filter(user => user.rol_id === 4).map(user => {
        const canton = this.cantones.find(c => c.id === user.canton_id);
        const parroquia = this.parroquias.find(p => p.id === user.parroquia_id);
        const recinto = this.recintos.find(r => r.id === user.recinto_id);
        return {
          ...user,
          canton_id: canton ? canton.nombre : 'Desconocido',
          parroquia_id: parroquia ? parroquia.nombre : 'Desconocido',
          recinto_id: recinto ? recinto.nombre : 'Desconocido'
        };
      }).reverse();
      this.checkDataLoaded();
    });
  }

  checkDataLoaded() {
    this.isDataLoaded = this.inscripcion.length > 0;
  }

  verInfo(row: any) {
    this.pendingElement = row;
    this.modal.open("info");
  }

  aceptarInscripcion(row: any) {
    this.pendingElement = row;
    this.modal.open("agregar");
  }

  rechazarInscripcion(row: any) {
    this.pendingElement = row;
    this.modal.open("rechazar");
  }

  confirmation(confirmacion: boolean) {
    if (confirmacion) {
      const email = {
        to: this.pendingElement.correo_electronico,
        subject: "Bienvenido al sistema de control electoral",
        html: "<html><body><h1>¡Felicidades has sido aceptado!</h1><p>Ahora formas parte del sistema de control electoral como delegado de la junta receptora del voto. No olvides realizar la capacitación obligatoria para que puedas desempeñar un buen trabajo el día de las elecciones. Confiamos en ti, sabemos que eres capar de realizar un trabajo expectacular.<br><br>Ahora descarga la aplicación <a href='https://votaciones-cliente-web.vercel.app'>aquí</a> para que puedes ayudarnos a combatir la alteración de los votos y que todo sea transparente.<br>¡Por un Ecuador libre de mentiras!</p><footer><p>Saludos,<br>Votaciones 2025</br></p></footer></body></html>"
      }
      this.data.sendEmail("https://sistema-electoral-cc1y.onrender.com/api/enviar-correo", email).subscribe(() => { }, (error) => console.log(error));
      const currentDateTime = new Date().toISOString();
      const data = {
        rol_id: 3,
        fecha_modificacion: currentDateTime,
        observacion: "Inscripción aceptada",
        usuario_ingreso: this.auth.getCurrentUser().id,
        usuario_modificacion: this.auth.getCurrentUser().id
      };
      this.data.updateDataById<any>("https://sistema-electoral-cc1y.onrender.com/api/usuarios", this.pendingElement.id, data).subscribe((response) => {
      }, (error) => {
        console.log(error);
      });
    }
    this.pendingElement = null;
  }

  delete(confirmacion: boolean) {
    if (confirmacion) {
      const email = {
        to: this.pendingElement.correo_electronico,
        subject: "Gracias por escogernos",
        html: "<html><body><h1>Mejor suerte la próxima</h1><p>No has sido aceptado para formar parte del sistema de control electoral. No te desanimes puedes volver a intentarlo para las próximas elecciones. Confiamos en ti, sabemos que eres capar de realizar un trabajo expectacular.<br><br></p><footer><p>Saludos,<br>Votaciones 2025</br></p></footer></body></html>"
      }
      console.log(email)
      this.data.sendEmail("https://sistema-electoral-cc1y.onrender.com/api/enviar-correo", email).subscribe(() => {}, (error) => console.log(error));
      this.data.deleteDataById("https://sistema-electoral-cc1y.onrender.com/api/usuarios", this.pendingElement.id).subscribe((response) => {
      }, (error) => {
        console.log(error);
      });
    }
    this.pendingElement = null;
  }

}

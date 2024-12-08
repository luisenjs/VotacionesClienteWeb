import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalVisibleSubject = new BehaviorSubject<boolean>(false);
  modalVisible$ = this.modalVisibleSubject.asObservable();

  openModal() {
    console.log("abro");
    this.modalVisibleSubject.next(true);
  }

  closeModal() {
    console.log("cierro");
    this.modalVisibleSubject.next(false);
  }
}

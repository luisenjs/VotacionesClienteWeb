import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalVisibilityMap = new Map<string, BehaviorSubject<boolean>>();

  openModal(id: string) {
    if (!this.modalVisibilityMap.has(id)) {
      this.modalVisibilityMap.set(id, new BehaviorSubject<boolean>(false));
    }
    this.modalVisibilityMap.get(id)?.next(true);
  }

  closeModal(id: string) {
    this.modalVisibilityMap.get(id)?.next(false);
  }

  isModalVisible(id: string) {
    if (!this.modalVisibilityMap.has(id)) {
      this.modalVisibilityMap.set(id, new BehaviorSubject<boolean>(false));
    }
    return this.modalVisibilityMap.get(id)?.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderPhotoService {
  private headerPhotoSource = new Subject<string | null>();
  private headerLabelSource = new Subject<string | null>();

  headerPhotoChanged = this.headerPhotoSource.asObservable();
  headerLabelChanged = this.headerLabelSource.asObservable();

  announceHeaderPhotoChanged(headerPhoto: string | null) {
    this.headerPhotoSource.next(headerPhoto);
  }

  announceHeaderLabelChanged(headerLabel: string | null) {
    this.headerLabelSource.next(headerLabel);
  }
}

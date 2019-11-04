import { Component, OnInit } from '@angular/core';
import { Boardmember, BoardmembersGQL } from 'src/generated/types.graphql-gen';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeaderPhotoService } from '../shared/header-photo/header-photo.service';

@Component({
  selector: 'app-boardmembers',
  templateUrl: './boardmembers.component.html',
  styleUrls: ['./boardmembers.component.scss']
})
export class BoardmembersComponent implements OnInit {

  boardMembers: Observable<Boardmember[]>;
  boardMembersSubscription: Subscription;

  constructor(
    private boardMembersGQL: BoardmembersGQL,
    private headerPhoto: HeaderPhotoService
  ) { }

  ngOnInit() {
    this.boardMembers = this.boardMembersGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.boardmembers)
      );

    this.boardMembersSubscription = this.boardMembers.subscribe();

    this.headerPhoto.announceHeaderPhotoChanged('/assets/images/boardmembers.jpg');
    this.headerPhoto.announceHeaderLabelChanged('Board Members');
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
    this.boardMembersSubscription.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Boardmember, BoardmembersGQL, BoardmembersInactiveGQL } from 'src/generated/types.graphql-gen';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeaderPhotoService } from '../shared/header-photo/header-photo.service';

@Component({
  selector: 'app-boardmembers',
  templateUrl: './boardmembers.component.html',
  styleUrls: ['./boardmembers.component.scss']
})
export class BoardmembersComponent implements OnInit, OnDestroy {

  boardMembers: Observable<Boardmember[]>;
  boardMembersSubscription: Subscription;

  boardMembersInactive: Observable<Boardmember[]>;
  boardMembersInactiveSubscription: Subscription;

  constructor(
    private boardMembersGQL: BoardmembersGQL,
    private boardMembersInactiveGQL: BoardmembersInactiveGQL,
    private headerPhoto: HeaderPhotoService
  ) { }

  ngOnInit() {
    this.boardMembers = this.boardMembersGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.boardmembers)
      );

    this.boardMembersSubscription = this.boardMembers.subscribe();

    this.boardMembersInactive = this.boardMembersInactiveGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.boardmembers)
      );

    this.boardMembersInactiveSubscription = this.boardMembersInactive.subscribe();

    this.headerPhoto.announceHeaderPhotoChanged('/assets/images/boardmembers.jpg');
    this.headerPhoto.announceHeaderLabelChanged('Board Members');
  }

  ngOnDestroy() {
    if (this.boardMembersSubscription) {
      this.boardMembersSubscription.unsubscribe();
    }
  }

}

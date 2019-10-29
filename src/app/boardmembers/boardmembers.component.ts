import { Component, OnInit } from '@angular/core';
import { Boardmember, BoardmembersGQL } from 'src/generated/types.graphql-gen';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-boardmembers',
  templateUrl: './boardmembers.component.html',
  styleUrls: ['./boardmembers.component.scss']
})
export class BoardmembersComponent implements OnInit {

  boardMembers: Observable<Boardmember[]>;
  boardMembersSubscription: Subscription;

  constructor(private boardMembersGQL: BoardmembersGQL) { }

  ngOnInit() {
    this.boardMembers = this.boardMembersGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.boardmembers)
      );

    this.boardMembersSubscription = this.boardMembers.subscribe();
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
  }

}

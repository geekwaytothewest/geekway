import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Page, SinglePageGQL } from 'src/generated/types.graphql-gen';
import { switchMap, map } from 'rxjs/operators';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: Observable<Page>;
  
  constructor(
    private route: ActivatedRoute,
    private singlepageGQL: SinglePageGQL,
    private markdownService: MarkdownService
  ) { }

  ngOnInit() {
    this.page = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {        
        let whereClauseGW = {
          "slug": params.get('slug')
        };

        return this.singlepageGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(        
            map(result => result.data.pages[0])
          );
      })
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oembed } from './oembed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OembedService {

  private iframelyUrl = 'https://cdn.iframe.ly/api/oembed/';
  oembedRegex = /<oembed url="(.*?)"><\/oembed>/g;

  constructor(
    private http: HttpClient
  ) { }

  getOembed(url: string): Observable<Oembed> {
    return this.http.get<Oembed>(this.iframelyUrl, {
      params: {
        url,
        key: '253d913d6041e5d6f884180f898d2986',
        omit_css: 'true'
      }
    });
  }
}

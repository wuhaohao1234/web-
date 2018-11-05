import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }from 'rxjs';

interface Member {
  id: string;
  login: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
    constructor(private http: HttpClient) { }

    getMembers(): Observable<Member[]>{
      return this.http
            .get<Member[]>(`https://api.github.com/orgs/angular/members?page=1&per_page=5`)
    }
}
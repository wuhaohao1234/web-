import { Component, OnInit } from '@angular/core';
import { MoovService } from "../moov.service";
import { Hero } from '../hero';

@Component({
  selector: 'app-moov',
  templateUrl: './moov.component.html',
  styleUrls: ['./moov.component.css']
})
export class MoovComponent implements OnInit {
  getHeroes(): void {
    this.moovService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1,5));
  }
  heroes:Hero[]
  constructor(private moovService:MoovService) { }

  ngOnInit() {
    
    this.getHeroes()
  }

}

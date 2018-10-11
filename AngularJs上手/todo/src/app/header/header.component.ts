import { Component, OnInit } from '@angular/core';
import { HeroService} from '../hero.service'
import {Hero} from '../hero'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  heroes:Hero[]
  selectedHero : Hero
  getHeroes():void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  constructor(private heroService: HeroService) { }
  onSeclet(hero: Hero): void {
    this.selectedHero = hero
  }
  ngOnInit() {
    this.getHeroes()
  }

}

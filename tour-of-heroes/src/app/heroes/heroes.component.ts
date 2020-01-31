import { Component, OnInit } from '@angular/core';
// import { HEROES } from '../mock-heroes.ts'; <-- I can remove this bc it will pull mock-heroes from service

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  	selector: 'app-heroes',
  	templateUrl: './heroes.component.html',
  	styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
	// hero: Hero = {
	// 	id: 1,
	// 	name: 'Windstorm'
	// };
	// ^^ I can remove this because I will grab it from the service.
	
	
	
	heroes: Hero[];

  constructor(private heroService: HeroService) { }
	// ^^ we "inject" the service by passing it as a parameter to the constructor function
	// the constructor should be used for wiring constructor parameters to properties
  ngOnInit() {
		// lifecycle hook that initializes the directive/component after NG first displays the data-bound properties and sets the directive/components input properties
		
		this.getHeroes();
	}
	
	// selectedHero: Hero;
	// onSelect(hero: Hero): void{
	// 	this.selectedHero = hero;
	// }
	// ^^ removed because I changed to routerLink
	
	getHeroes(): void {
		// this function is going to retrieve the heroes from the service.
		// I am guessing that we are going to have a getHeroes() function in hero.service
		
		// this.heroes = this.heroService.getHeroes();
		// ^^ this has a synchronyous signature. However, in the real world we need to run this asynchronously so that the browser will not block the website while we the service waits for a server response
		
		this.heroService.getHeroes()
			.subscribe(heroes => this.heroes = heroes);
		// ^^ this waits for the observable to emit an array of heroes--which can happen now or several minutes from now-- without the browser freezing the UI
		
	}
	
	add(name: string): void {
		name = name.trim();
		if(!name) {return;}
		this.heroService.addHero({ name } as Hero)
			.subscribe(hero => this.heroes.push(hero));
	}
	
	delete(hero: Hero): void {
		this.heroes = this.heroes.filter(h => h != hero);
		this.heroService.deleteHero(hero).subscribe();
	}

}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from '../models/hero';
import { HEROES } from '../mock-heroes';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private messageService: MessageService) { }
	
	getHeroes(): Observable<Hero[]> {
		// returns the mock heroes
		
		this.messageService.add('HeroService: fetched heroes'); 
		// ^^ when the getHeroes method is run it is going to send the param to the message service which we will then print to the ui
		
		return of(HEROES);
	}
	
	getHero(id: number): Observable<Hero> {
		this.messageService.add(`HeroService: fetched hero id=${id}`);
		return of(HEROES.find(hero => hero.id === id));
	}
}

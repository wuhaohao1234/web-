import { Component } from '@angular/core';

interface Person{
	name:string;
	age:number;
}

@Component({
  selector: 'app-root',
  template: `
	<h1>
		hello {{name}}
	</h1>
	<hr />
	<nav>
	  <a routerLink="/">首页</a>
	  <a routerLink="/user">我的</a>
	</nav>
	<router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'angular-demo';
}

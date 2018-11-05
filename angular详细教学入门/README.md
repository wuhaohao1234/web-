# 环境安装

## 下载安装

`npm install -g @angular/cli`

## 初始化

`ng new project-name`

## 启动

* 进入project-name
`ng serve --open`

# 插值表达式

## 绑定普通文本

* 进入src/app/app.component.ts修改装饰器@component

```
	@Component({
	  selector: 'app-root',
	  template: `
		<h1>
			hello {{name}}
		</h1>
	  `,
	  styleUrls: ['./app.component.css']
	})
	export class AppComponent {
	  name = 'angular-demo';
	}

```

## 绑定对象属性

```
	@Component({
	  selector: 'app-root',
	  template: `
		<h1>
			hello {{name}}
		</h1>
		<p>
			{{address.province}}
		</p>
		<p>
			{{address.add}}
		</p>
	  `,
	  styleUrls: ['./app.component.css']
	})
	export class AppComponent {
	  name = 'angular-demo';
	  address = {
	  	province:'city',
	  	add:'add'
	  }
	}

```

- 使用json管道

```
	@Component({
	  selector: 'app-root',
	  template: `
		<h1>
			hello {{name}}
		</h1>
		<p>
			{{address | json}}
		</p>
	  `,
	  styleUrls: ['./app.component.css']
	})
	export class AppComponent {
	  name = 'angular-demo';
	  address = {
	  	province:'city',
	  	add:'add'
	  }
	}

```

# 自定义组件

## 基础知识

	在 Angular 中，我们可以使用 Component 装饰器来定义组件的元信息

```
	@Component({
	  selector: 'my-app', // 用于定义组件在HTML代码中匹配的标签
	  template: `<h1>Hello {{name}}</h1>`, // 定义组件内嵌视图
	})

```

### 定义组件类

```
	export class AppComponent {
	  name = 'angular-demo';
	}

```

### 定义数据接口

```
	interface Person{
		name:string;
		age:number;
	}

	let person:Person = {
		name:'阿布',
		age:18
	}
```

### 自定义组件示例

* 在app目录下新建user.component组件

```

	import {Component} from '@angular/core'

	@Component({
		selector:'sl-user',
		template:`
			<div>
				<h2>我是UserComponent</h2>
			</div>
		`
	})

	export class UserComponent {
		
	}
```

### 声明UserComponent组件

* 在app.module.ts中

```
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	import { AppComponent } from './app.component';
	import { UserComponent } from './user.component';

	@NgModule({
	  declarations: [
	    AppComponent,
	    UserComponent	
	  ],
	  imports: [
	    BrowserModule
	  ],
	  providers: [],
	  bootstrap: [AppComponent]
	})
	export class AppModule { }

```

### 使用UserComponent组件(UserComponent的组件名为sl-user)

* 在app.component.ts中的template中

```
	template: `
		<h1>
			hello {{name}}
		</h1>
		<hr />
		<sl-user></sl-user>
	  `
```

### 初始化UserComponent中的数据(先声明)

```
	@Component({
	    selector: 'sl-user',
	    template: `
	        <div>
	            <h2>我是UserComponent</h2>
	            <p>
					{{name}}
	            </p>
	            <p>
					{{address}}
	            </p>
	        </div>
	    `
	})
	export class UserComponent {
		name:string;
		address:any;
	    constructor() {
	    	this.name='UserComponent',
	    	this.address = '我是any'
	    }
	}

```

# angular指令

## ngIf与noFor

* 进入user.component.ts中

```
	@Component({
	    selector: 'sl-user',
	    template: `
	        <div>
	            <h2>我是UserComponent</h2>
	            <p>
					{{name}}
	            </p>
	            <p>
					{{address}}
	            </p>
	        </div>
	        <div *ngIf="condition" >
				<p>我是显示的</p>
				<ul>
					<li *ngFor="let skill of skills" >
						{{skill}}
					</li>
				</ul>
	        </div>
	    `
	})
	export class UserComponent {
		name:string;
		address:any;
		condition:boolean;
		skills:string[];
	    constructor() {
	    	this.name='UserComponent'
	    	this.address = '我是any'
	    	this.condition = true
	    	this.skills = [
	    		'第n项数据',
	    		'第n项数据',
	    		'第n项数据',
	    		'第n项数据',
	    		'第n项数据',
	    		'第n项数据'
	    	]
	    }
	}

```

## angular事件

```
	<button (click)="toggleSkills()" >点击显示或隐藏</button>

	toggleSkills() {
    	this.condition = !this.condition
    }
```

## angular表单

### 在app.module.ts中引入FormsModule

```
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	import { FormsModule } from '@angular/forms';

	import { AppComponent } from './app.component';
	import { UserComponent } from './user.component';

	@NgModule({
	  declarations: [
	    AppComponent,
	    UserComponent	
	  ],
	  imports: [
	    BrowserModule,
	    FormsModule
	  ],
	  providers: [],
	  bootstrap: [AppComponent]
	})
	export class AppModule { }

```

### 在user.component.ts中使用表单模块

```
<form (submit)="addSkill(skill.value)" >
	<label>添加技能</label>
    <input type="text" #skill>
</form>

addSkill(skill: string) {
    let skillStr = skill.trim();
    if (this.skills.indexOf(skillStr) === -1) {
        this.skills.push(skillStr);
    }
}
```
#  Http 模块

## 在app.module.ts中引入HttpClientModule

```
	import { HttpClientModule } from '@angular/common/http';

	@NgModule({
	  declarations: [
	    AppComponent,
	    UserComponent	
	  ],
	  imports: [
	    BrowserModule,
	    FormsModule,
	    HttpClientModule
	  ],
	  providers: [],
	  bootstrap: [AppComponent]
	})

```

## 在user.component.ts中引入http模块

```
	import { HttpClient } from '@angular/common/http';
```

* 定义接口

```
	interface Member {
	  id: string;
	  login: string;
	  avatar_url: string;
	}
```

* 构造注入，注入 http 服务

```
	constructor(private http: HttpClient){}
```

* 加载数据

```
	members:Member[];
	ngOnInit() {
	    this.http.get<Member[]>(`https://api.github.com/orgs/angular/members?	page=1&per_page=5`) // (3)
	      .subscribe(data => {
	        if (data) this.members = data; // (4)
	      });
	}

```

* 显示数据

```
	<div>
		<h3>Angular Orgs Members</h3>
	    <ul *ngIf="members">
	      <li *ngFor="let member of members;">
	        <p>
	          <img [src]="member.avatar_url" width="48" height="48"/>
	          ID：<span>{{member.id}}</span>
	          Name: <span>{{member.login}}</span>
	        </p>
	      </li>
	    </ul>
	</div>
```

## 注入服务

* 新建member.service.ts文件

```
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
```

## 在user.component.ts中引入MemberService并使用

```
	import { MemberService } from "./member.service";

	constructor(private memberService: MemberService){
		ngOnInit() {
		    this.memberService.getMembers()
		      .subscribe(members => {
		        if (members) this.members = members;
		      });
		}
	}
```

# 路由模块


## 在app.module.ts中引入路由模块

```
	import { Routes, RouterModule } from '@angular/router';

```

## 定义路由组件

```
	export const ROUTES: Routes = [
	  { path: 'user', component: UserComponent }
	];
	@NgModule({
	  declarations: [
	    AppComponent,
	    UserComponent	
	  ],
	  imports: [
	    BrowserModule,
	    FormsModule,
	    HttpClientModule,
	    RouterModule.forRoot(ROUTES)
	  ],
	  providers: [],
	  bootstrap: [AppComponent]
	})
```

## 在app.component.ts中使用路由

```
	<nav>
	  <a routerLink="/">首页</a>
	  <a routerLink="/user">我的</a>
	</nav>
	<router-outlet></router-outlet>
```
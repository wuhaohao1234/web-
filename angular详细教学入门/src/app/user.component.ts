import { Component,OnInit } from '@angular/core';

import { MemberService } from "./member.service";

interface Member {
  id: string;
  login: string;
  avatar_url: string;
}

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
        <button (click)="toggleSkills()" >点击显示或隐藏</button>
        <div *ngIf="condition" >
			<p>我是显示的</p>
			<ul>
				<li *ngFor="let skill of skills" >
					{{skill}}
				</li>
			</ul>
        </div>
        <form (submit)="addSkill(skill.value)" >
			<label>添加技能</label>
            <input type="text" #skill>
        </form>
        <hr />
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
    `
})
export class UserComponent {
	name:string;
	address:any;
	condition:boolean;
	skills:string[];
	members:Member[];
    constructor(private memberService: MemberService){
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
    toggleSkills() {
    	this.condition = !this.condition
    }
    addSkill(skill: string) {
        let skillStr = skill.trim();
        if (this.skills.indexOf(skillStr) === -1) {
            this.skills.push(skillStr);
        }
    }
    ngOnInit() {
	    this.memberService.getMembers()
	      .subscribe(members => {
	        if (members) this.members = members;
	      });
	}
}
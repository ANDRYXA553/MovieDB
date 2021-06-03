import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from "../../../interfaces/UserInterface";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user: UserInterface

  constructor(private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  showUserDetails():void{
    this.router.navigate([this.user.id], {relativeTo: this.activatedRouter, state: this.user})
  }
}
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joinus',
  templateUrl: './joinus.component.html',
  styleUrl: './joinus.component.css'
})
export class JoinusComponent implements OnInit  {

  

  constructor(private router: Router, private appComponent: AppComponent) {
   
  }

  ngOnInit(): void {
    
  }
 
}

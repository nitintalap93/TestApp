import { Component, Input, OnInit, DoCheck, OnChanges, SimpleChanges, AfterViewInit, AfterViewChecked, viewChild, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, OnChanges ,DoCheck, AfterViewInit, AfterViewChecked  {
  @Input() myTitle:string = "ABC";
  // @ViewChild(AppComponent)
  childTitle:string = this.myTitle;

  // private abc: AppComponent = new AppComponent;

  constructor(){
    console.log('HomeComponent Constructor. Title :'+ this.myTitle);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('HomeComponent Changes' + JSON.stringify(changes));    
  }

  ngOnInit() {
    console.log('HomeComponent Initialize');
  }
 
  ngDoCheck(): void {
    console.log('HomeComponent DoCheck');
  }

  ngAfterViewInit(): void {
    console.log('HomeComponent ngAfterViewInit');   
  }

  ngAfterViewChecked(): void {
    console.log('HomeComponent ngAfterViewChecked');
  }  
}

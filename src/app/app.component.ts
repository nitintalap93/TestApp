import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,AfterViewChecked, OnDestroy, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked {
  title:string = 'TestApp123';
  ipcSectionShow:boolean = true;
  
  constructor() { 
    console.log('AppComponent Constructor');
  }

  // implement OnInit's `ngOnInit` method
  ngOnInit() {
    console.log('AppComponent Initialize');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('AppComponent OnChanges : ' + changes);
  }
  
  ngDoCheck(): void {
    console.log('AppComponent DoCheck');
  }

  ngAfterViewInit(): void {
    console.log('AppComponent ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('AppComponent ngAfterViewChecked');
  }  

  hide_ipcSections() : boolean {
    return this.ipcSectionShow = false;
    console.log("called");
  }

  show_ipcSections() : boolean {
    return this.ipcSectionShow = true;
  }
}

import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges, Input, TemplateRef } from '@angular/core';
import { DriveAPIsService } from './services/drive-apis.service';
import { Observable, Subscription, interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked {

  tokenInterval: Subscription = new Subscription;

  constructor(private driveApis: DriveAPIsService) {
    console.log('AppComponent Constructor');
    // this.tokenInterval = interval(this.driveApis.authTokenResponse.expiry * 1000).subscribe(x=>{this.driveApis.getToken()});
  }

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

  ngOnDestroy(): void {
    this.tokenInterval.unsubscribe();
  }
}

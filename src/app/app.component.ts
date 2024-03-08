import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges, Input, TemplateRef } from '@angular/core';
import { DriveAPIsService } from './services/drive-apis.service';
import { Subscription, interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked {
  title: string = 'TestApp123';
  ipcSectionShow: boolean = true;
  tokenInterval: Subscription = new Subscription;
  fileList = [];

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

  ngOnDestroy(): void{
    this.tokenInterval.unsubscribe();
  }

  hide_ipcSections(): boolean {
    return this.ipcSectionShow = false;
    console.log("called");
  }

  show_ipcSections(): boolean {
    return this.ipcSectionShow = true;
  }

  public getFileList() {
    this.driveApis.getFileList().pipe(map(data => {
      this.fileList = data["files"];
    })).subscribe({
      next(response) {
        console.log('response received');
        console.log(response);
      },
      error(err) {
        console.log('error' + JSON.stringify(err));
      },
      complete() {
        console.log('request completed');
      }
    });
  }

  // public downloadFile(fileElem:any) : void {
  //   let fileId = fileElem.attributes['fileId'].value;
  //   console.log('$$$$$$$$$$$$$$$$$$_______ FileID _________$$$$$$$$$$$$$$$$$');
  //   console.log(fileId);
  //   this.driveApis.downloadFile(fileId).subscribe({
  //     next(response) {
  //       console.log('download donw');
  //       console.log(response);
  //     },
  //     error(err) {
  //       console.log('download error' + JSON.stringify(err));
  //     },
  //     complete() {
  //       console.log('download completed');
  //     }
  //   });
  // }
}

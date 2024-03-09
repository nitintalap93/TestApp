import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges, Input, TemplateRef } from '@angular/core';
import { DriveAPIsService } from './services/drive-apis.service';
import { Observable, Subscription, interval, map } from 'rxjs';
import { Console } from 'console';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';

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
  fileToUpload?: FileList;
  resumableUrl:string = "";

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

  hide_ipcSections(): boolean {
    return this.ipcSectionShow = false;
    console.log("called");
  }

  show_ipcSections(): boolean {
    return this.ipcSectionShow = true;
  }

  public getFileList() {
    this.driveApis.getFileList().pipe(map(data => {
      console.log(data["files"]);
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

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files;
    let fileDetails = this.fileToUpload?.item(0)!;
    let fileName = fileDetails?.name!;
    let size = fileDetails?.size!;
    let mimeType = fileDetails?.type!;   
    console.log(this.fileToUpload?.item(0));
    // this.driveApis.getResumableURL()

    this.driveApis.getResumableURL(fileName, mimeType, "498a").pipe(map(data => {
      console.log(data.headers.get('location'));
      this.resumableUrl = data.headers.get('location');
    })).subscribe({
      next(response) {
        console.log('PreResumable URL');
      },
      error(err) {
        console.log('PreResumable url error :' + err);
      },
      complete() {
        console.log('PreResumable Url generated');
      }
    })

  }

  public uploadFile(): void {
    this.driveApis.uploadFile(this.resumableUrl, this.fileToUpload?.item(0)!).pipe(map(data => {
      return data;
    })).subscribe({
      next(response) {
        console.log('Upload Response');
      },
      error(err) {
        console.log('Upload url error :' + JSON.stringify(err));
      },
      complete() {
        console.log('Upload completed');
      }
    })
  }
}

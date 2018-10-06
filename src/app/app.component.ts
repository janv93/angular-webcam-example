import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("video")
  public video: ElementRef;   // ElementRef.nativeElement = DOM element
  @ViewChild("canvas")
  public canvas: ElementRef;
  public captures: Array<any>;

  public constructor() {
    this.captures = [];
  }

  public ngOnInit() { }

  public ngAfterViewInit() {      //   ask for permission to use camera
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;

        this.video.nativeElement.play();
      });
    }
  }

  public capture() {    // capture photo
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

}

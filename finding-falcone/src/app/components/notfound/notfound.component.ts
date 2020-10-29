import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `
  <h2 class="text-danger">Route Not Configured!</h2>
`,
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

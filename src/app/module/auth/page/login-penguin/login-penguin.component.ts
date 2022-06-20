import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-penguin',
  templateUrl: './login-penguin.component.html',
  styleUrls: ['./login-penguin.component.scss']
})
export class LoginPenguinComponent implements OnInit {
  selectedValue = 'english';

  constructor() { }

  ngOnInit(): void {
  }

}

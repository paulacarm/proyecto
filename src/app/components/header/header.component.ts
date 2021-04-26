import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
 //Para indicar que esta variable se va asignar desde el componente padre 

  @Input()
  title: string;
  name:string;
  constructor() { }

  ngOnInit() {}

}

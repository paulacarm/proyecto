import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta } from 'src/app/modelo/respuesta';

@Component({
  selector: 'app-solucuionesquiz',
  templateUrl: './solucuionesquiz.page.html',
  styleUrls: ['./solucuionesquiz.page.scss'],
})
export class SolucuionesquizPage implements OnInit {
  respuestas: Respuesta[];
  totalAciertos : number
  constructor(private route: ActivatedRoute, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.respuestas = this.router.getCurrentNavigation().extras.state.respuestas;
      this.totalAciertos = this.router.getCurrentNavigation().extras.state.totalAciertos
    }
   }

   saltar() {
     this.router.navigate(['home/juego'])
   }
  ngOnInit() {
  }

}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html'
})
export class JogoComponent implements OnInit {

  public segundosIniciar: number = 10;

  constructor(){
  }

  ngOnInit() {
    
  }
}

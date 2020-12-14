import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button class="reset" (click)="reset()">Reset</button>
    <h1>Current Player: {{ player }} </h1>
    <h2 *ngIf="winner">Player {{ winner }} won the game!</h2>
    <main>
      <button *ngFor="let val of squares; let i = index" [value]="val" (click)="makeMove(i)">{{val}}</button>
    </main>
  `,
  styles: [
    'button { color: #eee; border-radius: 5px;  background: #222; border: solid 1px #ccc; width: 120px; height: 120px; font-size: 3em !important; } button.reset {height: 40px; width: 120px; margin-bottom: 10px; font-size: 1em !important;} main {display: grid; grid-template-columns: 200px 200px 200px; grid-gap: 5px;} app-square {border: 1px gray solid; height: 200px;}']
})

export class SquareComponent implements OnInit {
  @Input() value: 'X' | 'O';
  squares: string[];
  xNext: boolean;
  winner: string;

  constructor() { }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
  this.squares = Array(9).fill(null);
  this.winner = null;
  this.xNext = true;
  }

  get player() {
    return this.xNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xNext = !this.xNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let item of lines) {
      const [a, b, c] = item;
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}

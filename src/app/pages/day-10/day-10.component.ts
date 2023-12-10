import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Component } from '@angular/core';
import { splitByNewLine } from '../../utils/string-parser';


/**
 * * | is a vertical pipe connecting north and south.
 * * \- is a horizontal pipe connecting east and west.
 * * L is a 90-degree bend connecting north and east.
 * * J is a 90-degree bend connecting north and west.
 * * 7 is a 90-degree bend connecting south and west.
 * * F is a 90-degree bend connecting south and east.
 * * . is ground; there is no pipe in this tile.
 * * S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
*/
export type Tile = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S';


@Component({
  selector: 'app-day-10',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './day-10.component.html',
  styleUrl: './day-10.component.scss'
})
export class Day10Component {
  protected input: string = '';
  protected output: number = 0;
  protected output2: number = 0;

  private x:number = 0;
  private y:number = 0;
  private map: Tile[][] = [];
  private steps: number = 0;
  private historyX: number[] = [];
  private historyY: number[] = [];
  private inLoop: boolean = false;
  private prevValueWasOnLoop: boolean = false;
  private onLoop: boolean = false;
  private firstTileOnLoop: Tile | undefined = undefined;


  private prevX:number = 0
  private prevY:number = 0
  /**
   * 1st test
    .....
    .S-7.
    .|.|.
    .L-J.
    .....
    output: 4


    2nd test
    TEST_INPUT's output: 8
//    */
  private TEST_INPUT =
`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`

// private TEST_INPUT =
// `.....
// .S-7.
// .|.|.
// .L-J.`

  

  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day10.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;
        // this.input = this.TEST_INPUT;
        this.calculate(this.input)
      })
    }

    private calculate(input: string): void {

      const inputSplit = splitByNewLine(input);
      
      for(let y = 0; y < inputSplit.length; y++) {
        this.map[y] = [];
        for(let x = 0; x < inputSplit[y].length; x++) {
          this.map[y][x] = inputSplit[y][x] as Tile;
        }
      }

      // Find starting point
      for(let y = 0; y < this.map.length; y++)
        for(let x = 0; x < this.map[y].length; x++)
          if(this.map[y][x] === 'S') {
            this.y = y;
            this.x = x;
            break;
          }

      // Find  1st step

      while(true){
        this.go();
        if(this.getCurrentTile() === 'S') break;
      }

      console.log(this.steps);

      this.output = Math.ceil(this.steps / 2);
      
      let loopSurface: number = 0;
      // scanline map for surface in the loop
      for(let y = 0; y < this.map.length; y++)
       { 
        this.inLoop = false;
        for(let x = 0; x < this.map[y].length; x++)
          {   
            if(this.map[y][x] === '.') {
              if(this.inLoop) loopSurface++;
              continue;
            }
            
            let isOnLoop = false;
            let breakOut = false;
              for(let i = 0; i < this.historyX.length; i++) {
                if(this.historyX[i] === x && this.historyY[i] === y) {
                  isOnLoop = true;
                  if(isOnLoop && this.map[y][x] === '|'){
                    this.toggleInLoop();
                    breakOut = true;
                    break;
                  }
                  if(this.firstTileOnLoop === undefined) {
                    this.firstTileOnLoop = this.map[y][x];
                    breakOut = true;
                  }
                  break; 
                }
              }

            if(breakOut ||  x == this.map[y].length -1) continue;

            if(isOnLoop) {
              if(this.map[y][x] === '-') continue;

              const currentTile = this.map[y][x];
              let isUTurn = false;

              if((this.firstTileOnLoop === 'F' || this.firstTileOnLoop === 'S') && currentTile === '7') isUTurn = true;
              else if((this.firstTileOnLoop === 'L' || this.firstTileOnLoop === 'S') && currentTile === 'J') isUTurn = true;

              if(!isUTurn) {
                this.toggleInLoop();
              }
              this.firstTileOnLoop = undefined;
              continue;
            } 

            if (isOnLoop)continue;

            if(this.inLoop) loopSurface++;
          }
        }

        this.output2 = loopSurface;
    }

    private go(): void {
      const currentTile = this.map[this.y][this.x];
      switch(currentTile) {
        case 'S':
          if(this.canGoNorth()) this.goNorth();
          else if(this.canGoSouth()) this.goSouth();
          else if(this.canGoEast()) this.goEast();
          else if(this.canGoWest()) this.goWest();
          else throw new Error('No way to go from starting point');
          break;
        case '|':
          if(this.canGoNorth()) this.goNorth();
          else if(this.canGoSouth()) this.goSouth();
          else throw new Error('No way to go from |');
          break;
        case '-':
          if(this.canGoEast()) this.goEast();
          else if(this.canGoWest()) this.goWest();
          else throw new Error('No way to go from -');
          break;
        case 'L':
          if(this.canGoNorth()) this.goNorth();
          else if(this.canGoEast()) this.goEast();
          else throw new Error('No way to go from L');
          break;
        case 'J':
          if(this.canGoNorth()) this.goNorth();
          else if(this.canGoWest()) this.goWest();
          else throw new Error('No way to go from J');
          break;
        case '7':
          if(this.canGoSouth()) this.goSouth();
          else if(this.canGoWest()) this.goWest();
          else throw new Error('No way to go from 7');
          break;
        case 'F':
          if(this.canGoSouth()) this.goSouth();
          else if(this.canGoEast()) this.goEast();
          else throw new Error('No way to go from F');
          break;
        case '.':
          throw new Error('No way to go from .');
        default:
          throw new Error('No way to go from ' + currentTile);
      }

    }


    private canGoNorth(): boolean {
      const nextY = this.y - 1;
      const nextX = this.x;
      if(nextY == this.prevY && nextX == this.prevX) return false;

      const tileOnNorth = this.map[nextY][nextX];
      switch(tileOnNorth) {
        case 'S':
        case '|':
        case '7':
        case 'F':
          return true;
        default:
          return false;
      }      
    }
    private canGoSouth(): boolean {
      const nextY = this.y + 1;
      const nextX = this.x;
      if(nextY == this.prevY && nextX == this.prevX) return false;

      const tileOnSouth = this.map[nextY][nextX];
      switch(tileOnSouth) {
        case 'S':
        case '|':
        case 'L':
        case 'J':
          return true;
        default:
          return false;
      }      
    }
    private canGoEast(): boolean {
      const nextY = this.y;
      const nextX = this.x + 1;
      if(nextY == this.prevY && nextX == this.prevX) return false;

      const tileOnEast = this.map[nextY][nextX];
      switch(tileOnEast) {
        case 'S':
        case '-':
        case 'J':
        case '7':
          return true;
        default:
          return false;
      }      
    }
    private canGoWest(): boolean {
      const nextY = this.y;
      const nextX = this.x - 1;
      if(nextY == this.prevY && nextX == this.prevX) return false;

      const tileOnWest = this.map[nextY][nextX];
      switch(tileOnWest) {
        case 'S':
        case '-':
        case 'L':
        case 'F':
          return true;
        default:
          return false;
      }      
    }

    private goNorth(): void {
      this.incrementStepsAndUpdateXYHistory()
      this.y--;
    }
    private goSouth(): void {
      this.incrementStepsAndUpdateXYHistory()
      this.y++;
    }
    private goEast(): void {
      this.incrementStepsAndUpdateXYHistory()
      this.x++;
    }
    private goWest(): void {
      this.incrementStepsAndUpdateXYHistory()
      this.x--;
    }

    private incrementStepsAndUpdateXYHistory(): void {
      this.steps++;
      this.prevX = this.x;
      this.prevY = this.y;
      this.historyX.push(this.x);
      this.historyY.push(this.y);
    }

    private getCurrentTile(): Tile {
      return this.map[this.y][this.x];
    }

    private toggleInLoop(): void {
      this.inLoop = !this.inLoop;
    }
}

import { Component } from '@angular/core';
import { getArrayOfNumbersFromLine } from '../../utils/string-parser';

@Component({
  selector: 'app-day-6',
  standalone: true,
  imports: [],
  templateUrl: './day-6.component.html',
  styleUrl: './day-6.component.scss'
})
export class Day6Component {

  protected input: string = 
  `Time:        48     93     85     95
Distance:   296   1928   1236   1391`;
  protected output: number = 0;
  protected output2: number = 0;
  
  constructor(){

    
    const inputSplit = this.input.split(/\r?\n|\r|\n/g);
    const times = getArrayOfNumbersFromLine(inputSplit[0].slice(5));
    const distances = getArrayOfNumbersFromLine(inputSplit[1].slice(9));


    const timesDistancesMap = new Map<number, number>();
    for(let i = 0; i < times.length && i < distances.length; i++) {
      timesDistancesMap.set(times[i], distances[i]);
    }

    const winningCombinationsList: number[] = [];
    timesDistancesMap.forEach((value, key) => {
      let winningCombinations = 0;
      const time = key;
      const distance = value;

      if(time <= 0){
        winningCombinations = distance;
        winningCombinationsList.push(winningCombinations);
        return;
      }

      for(let i = 0; i < time; i++) {
        const speed = i;
        const leftOverTime = time - i;

        let myDistance = leftOverTime * speed;

        if(myDistance > distance) {
          winningCombinations++;
        }
      }

      winningCombinationsList.push(winningCombinations);
    });
      
    winningCombinationsList.forEach(winningCombinations => {
      if(this.output == 0)
      this.output = winningCombinations;
      else
        this.output = this.output * winningCombinations;
      });

      
    //#region Part 2
    const timePart2 = Number.parseInt(inputSplit[0].slice(5).replace(/ +/g, ""));
    const distancePart2 = Number.parseInt(inputSplit[1].slice(9).replace(/ +/g, ""));

    for(let i = 0; i < timePart2; i++) {
      const speed = i;
      const leftOverTime = timePart2 - i;

      let myDistance = leftOverTime * speed;

      if(myDistance > distancePart2) {
        this.output2++;
      }
    }

    //#endregion

  }
}

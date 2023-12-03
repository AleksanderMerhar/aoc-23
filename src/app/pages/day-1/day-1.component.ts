import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-day-1',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './day-1.component.html',
  styleUrl: './day-1.component.scss'
})
export class Day1Component {
  protected input: string = ''
  protected output: number = 0;

  private readonly regCheckIfInt = new RegExp('^[0-9]+$');

  
  private readonly stringToNumberMap: any= {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
  };


  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day1.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;
        const inputSplitByNewLine = this.input.split(/\r?\n|\r|\n/g);
        this.output = 0;

        const generatedNumbers: number[] = [];

        inputSplitByNewLine.forEach(line => {
          line = line.trim();
          let firstNumber: number | null = null;
          let lastNumber: number | null = null;
          
          let map: any = {
            'one': null,
            'two': null,
            'three': null,
            'four': null,
            'five': null,
            'six': null,
            'seven': null,
            'eight': null,
            'nine': null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null,
            9: null,
          }

          Object.keys(map).forEach(key => {
            const searchTerm = key;
            const indexOfFirst = line.indexOf(searchTerm);
            map[key] = indexOfFirst;
          });

          let min = Number.MAX_SAFE_INTEGER;
          let minKey = '';
          let max = -2;
          let maxKey = '';
          Object.keys(map).forEach(key => {
            const value = map[key];
            if(value === null || value === -1)
              return;
            
            if(value < min){
              min = value;
              minKey = key;
            }
            if (value > max) {
              max = value;
              maxKey = key;
            }
          });


          if (minKey === '') return;

          if(!this.regCheckIfInt.test(minKey)){
            firstNumber = this.stringToNumberMap[minKey as string];
          } else {
            firstNumber = Number.parseInt(minKey);
          }

          if(maxKey !== '')
            if(!this.regCheckIfInt.test(maxKey)){
              lastNumber = this.stringToNumberMap[maxKey as string];
            } else {
              lastNumber = Number.parseInt(maxKey);
            }
          else
            lastNumber = firstNumber;

          let generatedNumber: number = 0;

          if (firstNumber !== null && lastNumber !== null) {
            const concatFirstAndLastNumber = firstNumber.toString() + lastNumber.toString();
            generatedNumber = Number.parseInt( concatFirstAndLastNumber);
          } else if (firstNumber !== null) {
            const concatFirstNumberTwice = firstNumber.toString() + firstNumber.toString();
            generatedNumber = Number.parseInt( concatFirstNumberTwice);
          }


          generatedNumbers.push(generatedNumber);

        });

        generatedNumbers.forEach(number => {
          this.output += number;
        });
      
      });
  }
}

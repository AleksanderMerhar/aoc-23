import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-day-3',
  standalone: true,
  imports: [HttpClientModule],  templateUrl: './day-3.component.html',
  styleUrl: './day-3.component.scss'
})
export class Day3Component {
  protected input: string = ''
  protected output: number = 0;

  private readonly regCheckIfInt = new RegExp('^[0-9]+$');


  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day3.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;

        const numbers: number[] = [];

        let numberBuffer = '';
        let isLeftsideSymbol = false;

        for (let i = 0; i < this.input.length; i++) {
          let char = this.input[i];
          
          if(this.regCheckIfInt.test(char)){
            numberBuffer = numberBuffer + char;
            continue;
          }

          if(char == '.'){
            if(isLeftsideSymbol){
              numbers.push(Number.parseInt(numberBuffer));
            }

            numberBuffer = '';
            isLeftsideSymbol = false;
            continue;
          }

          // char is symbol
            if(isLeftsideSymbol){
              if(numberBuffer.length > 0)
                numbers.push(Number.parseInt(numberBuffer));
              numberBuffer = '';
            } else {
              isLeftsideSymbol = true;
            }
            continue;
        }
        numbers.forEach(number => {
          if(Number.isInteger(number)&& !Number.isNaN(number)) 
            this.output += number;
        });
      }
    );
  }
}

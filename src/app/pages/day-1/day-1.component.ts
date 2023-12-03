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

  private readonly reg = new RegExp('^[0-9]+$');


  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day1.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;
        const inputSplitByNewLine = this.input.split(/\r?\n|\r|\n/g);
        this.output = 0;

        const generatedNumbers: number[] = [];

        inputSplitByNewLine.forEach(line => {
          let firstNumber: number | null = null;
          let lastNumber: number | null = null;
          
          for (let i = 0; i < line.length; i++) {
            const numberCandidate = Number.parseInt(line[i]);
            if(this.reg.test(numberCandidate.toString()) === false)
              continue;

            if(firstNumber === null)
              firstNumber = numberCandidate;
            

            lastNumber = numberCandidate;
          }

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

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { getArrayOfNumbersFromLine, splitByNewLine } from '../../utils/string-parser';

@Component({
  selector: 'app-day-9',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './day-9.component.html',
  styleUrl: './day-9.component.scss'
})
export class Day9Component {
  protected input: string = '';
  protected output: number = 0;

  /**
   * 1st line: 18
   * 2nd line: 28
   * 3rd line: 68
   * output: 114
   *
   */
  private TEST_INPUT =
`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`


  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day9.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;
        // this.input = this.TEST_INPUT;
        this.calculate(this.input)
      })
    }

    private calculate(input: string): void {
      const lines = splitByNewLine(input);
      const oasisValuesList: number[][] = [];
      lines.forEach(line => {
        oasisValuesList.push(getArrayOfNumbersFromLine(line))
      });

      const results: number[] = [];
      oasisValuesList.forEach(oasisValues => {

        // Get diffs until all diffs are 0
        let diffsList: number[][] = [oasisValues];
        let currentDiffs: number[] =  oasisValues;
        while(!currentDiffs.every(x => x === 0)) {

            const diffs: number[] = [];
            for(let i = 1; i < currentDiffs.length; i++) {
              diffs.push(currentDiffs[i] - currentDiffs[i-1]);
            }
            diffsList.push(diffs);
            currentDiffs = diffs;
        }

        // extrapolate
        // add 0 to last diffs
        const lastDiffs = diffsList.pop();
        lastDiffs?.push(0);
        diffsList.push(lastDiffs as number[]);

        for(let i = diffsList.length - 2;  i >= 0; i--) {
          const diffs = diffsList[i];
          const diffsBelow = diffsList[i+1];

          const diffsLastElement = diffs.at(diffs.length-1) ?? 0;
          const diffsBelowLastElement = diffsBelow.at(diffsBelow.length-1) ?? 0;

          diffs.push(diffsLastElement + diffsBelowLastElement);
        }

        const nextValueOfHistry = diffsList[0].pop();

        results.push(nextValueOfHistry as number);
      });

      
      results.forEach(result => {
        this.output += result;
      });


    }

}

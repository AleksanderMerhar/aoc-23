import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-day-4',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './day-4.component.html',
  styleUrl: './day-4.component.scss'
})
export class Day4Component {
  protected input: string = ''
  protected output: number = 0;

  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day4.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;

        // Example of input:
        // Card   1: 30 48 49 69  1 86 94 68 12 85 | 86 57 89  8 81 85 82 68  1 22 90  2 74 12 30 45 69 92 62  4 94 48 47 64 49
        // Card   2: 57 32 92 73 76 62 11 19 61 90 | 19 82 53 87 57 80 69 76 90 56 11 61 30 92 73 99  4 32 33 64 34 62 27 78 65
        // ...
        // Card 201: 71 92 68 45 33 17 99 32 96 93 | 90 82 79 26 20 85 94 61 31 84 73 30  4 87 29 28 81 27 75 39 36 58 97 98 21

        const cards = this.input.split(/\r?\n|\r|\n/g);

        let cardScores: number[] = [];

        this.output = 0;

        cards.forEach(card => {
          const cardSplit = card.split(':');
          const cardNumber = Number.parseInt(cardSplit[0].slice(5).trim());

          const numbers = cardSplit[1].split('|');
          const winningNumbers = this.getArrayOfNumbersFromLine(numbers[0]);
          const myNumbers = this.getArrayOfNumbersFromLine(numbers[1]);

          let combos = 0;
          myNumbers.forEach(myNumber => {
            if(winningNumbers.includes(myNumber)) {
              combos++;
            }
          });

          let cardScore = 0;
          if(combos > 0)
            cardScore = Math.pow(2, combos - 1)

          cardScores.push(cardScore);
        });

        cardScores.forEach(cardScore => {
          this.output += cardScore;
        });
      })}

  /**
   * Get array of numbers
   * @param line Example:  11 96 50  5 37 58 42 81 79  3 
   */
  private getArrayOfNumbersFromLine(line: string): number[] {
    const numbers: number[] = [];

    let numberBuffer = '';
    for(let i = 0; i < line.length; i++) {
      if(line[i] == ' '){

        if(numberBuffer.length > 0)
          numbers.push(Number.parseInt(numberBuffer));

        numberBuffer = '';
        continue;
      }

      numberBuffer = numberBuffer + line[i];
    }

    if(numberBuffer.length > 0)
      numbers.push(Number.parseInt(numberBuffer));

    return numbers;

  }
    
}

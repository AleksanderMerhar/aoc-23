import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-day-2',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './day-2.component.html',
  styleUrl: './day-2.component.scss'
})
export class Day2Component {
  protected input: string = ''
  protected output: number = 0;

  private maxRed = 12;
  private maxGreen = 13;
  private maxBlue = 14;

  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day2.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;

        const games = this.input.split(/\r?\n|\r|\n/g);
        this.output = 0;

        const validIDs: number[] = [];

        games.forEach(line => {
          const lineSplit = line.split(':');
          const ID = Number.parseInt(lineSplit[0].slice(5));

          let gameIsValid = true;
          const rounds = lineSplit[1].split(';');
          rounds.forEach(round => {
            const numberAndColors = round.split(',');
            let red = 0;
            let green = 0;
            let blue = 0;

            numberAndColors.forEach(numberAndColor => {
              if (numberAndColor.at(0) === ' ')
                numberAndColor = numberAndColor.slice(1);

              const numberAndColorSplit = numberAndColor.split(' ');
              const number = Number.parseInt(numberAndColorSplit[0]);
              const color = numberAndColorSplit[1];

              if (color === 'red') {
                red += number;
              } else if (color === 'green') {
                green += number;
              } else if (color === 'blue') {
                blue += number;
              }
            });


            if (red > this.maxRed || green > this.maxGreen || blue > this.maxBlue) {
              gameIsValid = false;
              return;
            }
          });

          if(gameIsValid)
            validIDs.push(ID);
        });

        validIDs.forEach(ID => {
          this.output += ID;
        });

      });
    };
}

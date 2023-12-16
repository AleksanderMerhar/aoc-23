import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { splitByNewLine } from '../../utils/string-parser';

type Tile = '.' | '#' | '?';
interface SpringRow {
  schema: string;
  schemaArray: Tile[];
  groupSizes: number[];
  possibleArrangements: Tile[][];
  validArrangements: number;
}

@Component({
  selector: 'app-day-12',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './day-12.component.html',
  styleUrl: './day-12.component.scss'
})
export class Day12Component {
  protected input: string = '';
  protected output: number = 0;

  /**
    In this example, the number of possible arrangements for each row is:

    ???.### 1,1,3 - 1 arrangement
    .??..??...?##. 1,1,3 - 4 arrangements
    ?#?#?#?#?#?#?#? 1,3,1,6 - 1 arrangement
    ????.#...#... 4,1,1 - 1 arrangement
    ????.######..#####. 1,6,5 - 4 arrangements
    ?###???????? 3,2,1 - 10 arrangements
    SUM = 21 arrangements.

   */
  private TEST_INPUT =
`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

private TEST_INPUT2 =
`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
???? 1,1`

  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day12.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;
        // this.input = this.TEST_INPUT2;
        this.calculate(this.input)
      })
    }

    private calculate(input: string): void {
      const lines = splitByNewLine(input);

      const springRows: SpringRow[] = [];

      lines.forEach(line => {
        const lineSplit = line.split(' ');
        const schema = lineSplit[0];
        const schemaArray = schema.split('') as Tile[];
        const groupSizes = lineSplit[1].split(',').map(x => parseInt(x));
        const possibleArrangements: Tile[][] = [];
        const validArrangements = 0
        const springRow: SpringRow = {
          schema,
          schemaArray,
          groupSizes,
          possibleArrangements,
          validArrangements
        }
        springRows.push(springRow);

      }
      );

      springRows.map(springRow => {
        const unknownTiles = this.getUnknowTiles(springRow.schemaArray);
        const possibleCombinations = Math.pow(2, unknownTiles);
        for(let i = 0; i <= possibleCombinations; i++) {
          const binary = this.toBinaryString(i, unknownTiles);
          const binaryArray = binary.split('');

          const possibleArrangement: Tile[] = [];

          let binaryIndex = 0;
          springRow.schemaArray.forEach((tile, index) => {
            if(tile === '?') {
              binaryArray[binaryIndex] === '1'
                ? possibleArrangement.push('#')
                : possibleArrangement.push('.');
              
              binaryIndex++;
            } else {
              possibleArrangement.push(tile);
            }

          });

          springRow.possibleArrangements.push(possibleArrangement)
        }

        const memoizedValidArrangements: string[] = [];
        springRow.possibleArrangements.forEach(possibleArrangement => {
          const groupSizes = this.getGroupSizesFromArrangement(possibleArrangement);

          if(memoizedValidArrangements.includes(possibleArrangement.join(''))) return;


          if(!this.areGroupSizesEquale(groupSizes, springRow.groupSizes)) return;

          springRow.validArrangements++;
          memoizedValidArrangements.push(possibleArrangement.join(''));

          
        });
      });

      springRows.forEach(springRow => {
        this.output += springRow.validArrangements;
      });

    }

    private getUnknowTiles(schemaArray: Tile[]): number {
      return schemaArray.filter(x => x === '?').length;
    }

    private toBinaryString(n: number, length: number): string {
      const binary = n.toString(2).split('').reverse().join('');
      
      return binary.padEnd(length, '0');
    } 
    
    private getGroupSizesFromArrangement(arrangement: Tile[]): number[] {
      const groupSizes: number[] = [];
      let currentGroupSize = 0;
      arrangement.forEach(tile => {
        if(tile === '#') {
          currentGroupSize++;
        } else {
          if(currentGroupSize > 0) {
            groupSizes.push(currentGroupSize);
            currentGroupSize = 0;
          }
        }
      });

      if(currentGroupSize > 0) {
        groupSizes.push(currentGroupSize);
      }

      return groupSizes;
    }

    private areGroupSizesEquale(groupSizes1: number[], groupSizes2: number[]): boolean {
      if(groupSizes1.length !== groupSizes2.length) return false;
      for(let i = 0; i < groupSizes1.length; i++) {
        if(groupSizes1[i] !== groupSizes2[i]) return false;
      }

      return true;
    }



}

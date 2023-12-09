import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

interface Node {
  // id: string;
  left: string;
  right: string;
}

@Component({
  selector: 'app-day-8',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './day-8.component.html',
  styleUrl: './day-8.component.scss'
})
export class Day8Component {

  protected input: string = '';
  protected output: number = 0;

  private readonly END = 'ZZZ';
  private readonly START = 'AAA';

  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day8.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;
        // Test inputs
        // this.input = 
// `RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)`
        // output = 2

        // this.input = 
// `LLR
// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`
        // output = 6
        
        this.calculate2(this.input);
      })
    }
    calculate(input: string): void {
      // 0 - path
      // 1 - empty line
      // 2..n - nodes
      const inputSplitByNewLine = input.split(/\r?\n|\r|\n/g);

      const path = inputSplitByNewLine[0];

      const startIds: string[] = [];
      const nodesMap = new Map<string, Node>();
      for(let i = 2; i < inputSplitByNewLine.length; i++) {
        const line = inputSplitByNewLine[i];
        const lineSplit = line.split(' = ');
        const id = lineSplit[0];
        const left = lineSplit[1].slice(1, 4);
        const right = lineSplit[1].slice(6, 9);

        nodesMap.set(id, {left: left, right: right});
      }

      let steps = 0;
      let currentId: string = this.START;
      while(currentId != this.END) {
        const node = nodesMap.get(currentId);
        if(!node) break;

        if(path[steps % path.length] === 'L') {
          currentId = node.left;
        } else if(path[steps % path.length] === 'R') {
          currentId = node.right;
        }

        steps++;

        if(steps > 500_000_000)break;
      }

      // Step 1
      // Get steps for each start point

      // Step 2
      // Get LCM of all results (steps)

      this.output = steps;

    }

    calculate2(input: string): void {
      // 0 - path
      // 1 - empty line
      // 2..n - nodes
      const inputSplitByNewLine = input.split(/\r?\n|\r|\n/g);

      const path = inputSplitByNewLine[0];

      const startIds: string[] = [];
      const nodesMap = new Map<string, Node>();
      for(let i = 2; i < inputSplitByNewLine.length; i++) {
        const line = inputSplitByNewLine[i];
        const lineSplit = line.split(' = ');
        const id = lineSplit[0];
        const left = lineSplit[1].slice(1, 4);
        const right = lineSplit[1].slice(6, 9);

        nodesMap.set(id, {left: left, right: right});
        if(id[2] == 'A') startIds.push(id);
      }

      

      // Step 1
      // Get steps for each start point
      let stepsList: number[] = [];
      for(let i = 0; i < startIds.length; i++) {
        let currentId: string = startIds[i];

        let steps = 0;
        while(currentId[2] != 'Z') {
          const node = nodesMap.get(currentId);
          if(!node) break;
  
          if(path[steps % path.length] === 'L') {
            currentId = node.left;
          } else if(path[steps % path.length] === 'R') {
            currentId = node.right;
          }
  
          steps++;
  
          if(steps > 500_000_000)break;
        }
        stepsList.push(steps);
      }

      // Step 2
      // Get LCM of all results (steps)
      this.output = this.getLCM(stepsList);
    }


    private getLCM = (numbers: number[]): number => {
      return numbers.reduce(this.lcm)
    };
    private gcd = (a : number, b : number): number => a ? this.gcd(b % a, a) : b;

    private lcm = (a : number, b : number): number => a * b / this.gcd(a, b);


}

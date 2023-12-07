import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

interface Hand {
  cards: string;
  bid: number;
  handType: number;
  cardsRating: number[];
}

@Component({
  selector: 'app-day-7',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './day-7.component.html',
  styleUrl: './day-7.component.scss'
})
export class Day7Component {

  protected input: string = '';
  protected output: number = 0;



  constructor(httpClient: HttpClient) {
    httpClient
      .get('assets/inputs/day7.txt', {responseType: 'text'})
      .subscribe(data => {
        this.input = data;
        // Test input
//         this.input = 
// `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`
        this.calculate(this.input);
      })}


      public calculate(input: string): void {
        const hands = this.input.split(/\r?\n|\r|\n/g);
        const handsMap = new Map<string, number>();
        hands.forEach(hand => {
          const handSplit = hand.split(' ');
          const cards = handSplit[0];
          const bid = Number.parseInt(handSplit[1].trim());
          handsMap.set(cards, bid);
        });

        let handsUnsorted: Hand[] = [];

        handsMap.forEach((bid, cards) => {
          const handType = this.getHandType(cards);
          const cardsRating = cards.split('').map(card => this.getCardRating(card));

          handsUnsorted.push({cards, bid, handType, cardsRating});
        });

        let handsSorted: Hand[] = [];
        handsUnsorted.forEach(hand => {
          let index = handsSorted.length;
          
          for(let i = 0; i < handsSorted.length; i++) {
            const handSorted = handsSorted[i];

            let handCompare: 'equal' | 'smaller' | 'bigger' = 'equal';

            if(hand.handType === handSorted.handType) {
              for(let j = 0; j < hand.cardsRating.length; j++) {
                if(hand.cardsRating[j] < handSorted.cardsRating[j]) {
                  handCompare = 'smaller';
                  break;
                }

                if(hand.cardsRating[j] > handSorted.cardsRating[j]) {
                  handCompare = 'bigger';
                  break;
                }


                if(hand.cardsRating[j] === handSorted.cardsRating[j]) {
                  continue;
                }
              }
            }
            else if(hand.handType < handSorted.handType) {
              handCompare = 'smaller';
            }
            else if(hand.handType > handSorted.handType) {
              handCompare = 'bigger';
            }

            if(handCompare === 'smaller') {
              index = i;
              break;
            }
            if(handCompare === 'bigger') {
              continue;
            }
          }

          handsSorted.splice(index, 0, hand);
        });

        console.log(handsSorted);

        for (let i = 0; i < handsSorted.length; i++) {

          this.output += handsSorted[i].bid * (i + 1);
        }




      }

      public getCardRating(card: string): number {
        switch(card) {
          case 'A': return 14;
          case 'K': return 13;
          case 'Q': return 12;
          case 'J': return 11;
          case 'T': return 10;
          default: return Number.parseInt(card);
        }
      }

      public getHandType(cards: string): number {
        const cardMap = new Map<string, number>();
        
        for(let i = 0; i < cards.length; i++) {
          const card = cards[i];
          cardMap.set(card, (cardMap?.get(card) ?? 0) + 1);
        }

        // 0 = high card
        // 1 = pair
        // 2 = two pair
        // 3 = three of a kind
        // 4 = full house
        // 5 = four of a kind
        // 6 = five of a kind
        let handType = 0;

        let isThere3OfAKind = false;
        let isThereFirstPair = false;
        let isThereSecondPair = false;

        cardMap.forEach((score, card) => {
          
          if(score == 5){
            handType = 6;
            return;
          }
          if(score == 4){
            handType = 5;
            return;
          }

          if(score == 3){
            isThere3OfAKind = true;
          }

          if(score == 2 && !isThereFirstPair){
            isThereFirstPair = true;
          }
          else if(score == 2  && isThereFirstPair){
            isThereSecondPair = true;
          }

        });

        if(isThere3OfAKind && isThereFirstPair){
          handType = 4;
        } else if(isThere3OfAKind && !isThereFirstPair){
          handType = 3;
        } else if(isThereFirstPair && isThereSecondPair){
          handType = 2;
        } else if(isThereFirstPair){
          handType = 1;
        }

        return handType;
      }
}

  /**
   * Get array of numbers
   * @param line Example:  11 96 50  5 37 58 42 81 79  3 
   */
  export const getArrayOfNumbersFromLine = (line: string): number[] => {
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
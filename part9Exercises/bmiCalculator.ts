interface Inputs {
  weight: number,
  height: number,
}

const getWeightAndHeight = (args: Array<string>): Inputs => {
  if (args.length > 4) throw new Error('Too many arguments given');
  if (args.length < 4) throw new Error('Too few arguments given');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    }
  } else {
    throw new Error('One or more values given was not a number');
  }
}

const calculateBmi = (weight: number, height: number): string => {
  const bmi = weight/(height/100) ** 2;
  if (bmi < 18.5) {
    return 'Low (under weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'High (over weight)';
  } else if (bmi > 30) {
    return 'Very high (obese)';
  } else {
    return 'Normal (healthy weight)';
  }
}


try {
  const { weight, height } = getWeightAndHeight(process.argv);
  console.log(calculateBmi(weight, height));
} catch (e) {
  console.log('Error, something horrible has happened, more info here ---> ', e.message);
}
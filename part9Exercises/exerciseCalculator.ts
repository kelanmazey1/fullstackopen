interface ExerciseInfo {
  days: number,
  trainingDays: number,
  targetValue: number,
  averageTime: number,
  targetReached: boolean,
  rating: number,
  ratingDescription: string,
}

interface RatingWithInfo {
  rating: number,
  ratingDescription: string,
}

interface ExerciseInputs {
  target: number,
  exerciseHours: Array<number>
}

const getTargetAndHours = (args: Array<string>): ExerciseInputs => {
  if (args.length < 4) throw new Error('Too few arguments given');
  
  const target = Number(args[2]);

  const exerciseHours = args.slice(3).map((element) => Number(element));

  let arrayIsAllNumbers = true;

  exerciseHours.forEach((element) => {
    if (isNaN(element)) {
      arrayIsAllNumbers = false;
    }
})
  if (!isNaN(target) && arrayIsAllNumbers) {
    return {
      target,
      exerciseHours,
    }
  } else {
    throw new Error('One of more values given was not a number');
  }
}

const getRating = (targetVsActual: number): RatingWithInfo => {
  if (targetVsActual < -1) {
    return {
      rating: 1,
      ratingDescription: 'a pretty lazy week I must say'
    }
   } else if (targetVsActual > 1) {
    return {
      rating: 3,
      ratingDescription: 'great week you should be proud' 
    }
  } else {
    return {
      rating: 2,
      ratingDescription: 'meh, could be worse could be better'
    }
  }
}

const calculateExercise = (exerciseHours: Array<number>, target: number): ExerciseInfo  => {

  const averageTime = exerciseHours.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }) / exerciseHours.length;

  const trainingDays = exerciseHours.filter((hoursExercised) => hoursExercised !== 0).length;

  const targetVsActual = averageTime - target;

  const targetReached = Math.sign(targetVsActual) === 1 ? true : false;

  const { rating, ratingDescription } = getRating(targetVsActual);

  return {
    days: exerciseHours.length,
    targetValue: target,
    averageTime,
    trainingDays,
    targetReached,
    rating,
    ratingDescription  
  }
}

try {
  const { target, exerciseHours } = getTargetAndHours(process.argv);
  console.log(calculateExercise(exerciseHours, target));
} catch (e) {
  console.log('Error, something horrible has happened, more info here ---> ', e.message);
}
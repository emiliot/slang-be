import { GRADES, SPELLING_LEVELS, WARNING_THRESHOLD } from "../constants/spelling";
import words from '../spellingsData/words';

export const gradeExercise = (text, userInput) => {
  let grade = {
    result: GRADES.APPROVED,
    diff: []
  }

  text.split('').forEach((original, index) => {
    if (original !== userInput[index]){
      grade.diff.push({
        original,
        user: userInput[index],
        index,
      })
    }
  })

  if (grade.diff.length > WARNING_THRESHOLD) {
    grade.result = GRADES.REJECTED
  } else if (grade.diff.length > 0) {
    // check if the error is transposed characters
    let transposed = true
    for(let i=1; i < grade.diff.length; i++){
      if (grade.diff[i].index - grade.diff[i-1].index > 1) {
        transposed = false
      }
    }

    if(transposed) {
      grade.result = GRADES.WARNING
    } else {
      grade.result = GRADES.REJECTED
    }
  }

  return grade
}

const getNextLevel = level => {
  switch (level) {
    case SPELLING_LEVELS.EASY: return SPELLING_LEVELS.MEDIUM
    case SPELLING_LEVELS.MEDIUM:
    // TODO: decide what to do after hard
    case SPELLING_LEVELS.HARD:
      return SPELLING_LEVELS.HARD
  }
}

export const getNextExercise = (level, index, grade) => {
  let result = {
    index,
    level,
    text: words[level][index]
  }
  
  if ([GRADES.APPROVED, GRADES.WARNING].includes(grade.result)) {
    if (index + 1 >= words[level].length) {
      const nextLevel = getNextLevel(level)
      result = {
        level: nextLevel,
        index: 0,
        text: words[nextLevel][index]
      }
    } else {
      result.index = index + 1
      result.text = words[level][index + 1]
    }
  }

  return result
}

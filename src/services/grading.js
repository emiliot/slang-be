import { GRADES, SPELLING_LEVELS } from "../constants/spelling";
import words from '../spellingsData/words';

export const gradeExercise = (text, userInput) => {
  // TODO: make a more real grade
  return {
    result: GRADES.APPROVED,
    diff: []
  }
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

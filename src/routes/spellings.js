import { Router } from 'express';
import words from '../spellingsData/words';
import { SPELLING_LEVELS } from '../constants/spelling';
import * as GradingService from '../services/grading';

const router = Router();

router.get('/', (req, res) => {
  let result = [];
  const { level = SPELLING_LEVELS.EASY, index = 0 } = req.query;

  switch (level) {
    case SPELLING_LEVELS.MEDIUM:
      result = {
        index,
        text: words[SPELLING_LEVELS.MEDIUM][index],
        level: SPELLING_LEVELS.MEDIUM,
      };
      break;
    case SPELLING_LEVELS.HARD:
      result = {
        index,
        text: words[SPELLING_LEVELS.HARD][index],
        level: SPELLING_LEVELS.HARD,
      };
      break;
    case SPELLING_LEVELS.EASY:
    default:
      result = {
        index,
        text: words[SPELLING_LEVELS.EASY][index],
        level: SPELLING_LEVELS.EASY,
      };
      break;
  }

  res.json(result);
});

router.post('/grade', (req, res) => {
  const { text, userInput, level, index } = req.body;
  const grade = GradingService.gradeExercise(text, userInput);
  const result = {
    grade: grade.result,
    diff: grade.diff,
    next: GradingService.getNextExercise(level, index, grade),
  };
  res.json(result);
});

export default router;

import { Router } from 'express';
import words from '../spellingsData/words'
import { SPELLING_LEVELS } from '../constants/spelling'

const router = Router();

router.get('/', (req, res) => {
  let result = [];
  
  switch (req.query.level) {
    case SPELLING_LEVELS.MEDIUM:
      result = words[SPELLING_LEVELS.MEDIUM];
      break;
    case SPELLING_LEVELS.HARD:
      result = words[SPELLING_LEVELS.HARD];
      break;
    case SPELLING_LEVELS.EASY:
    default:
      result = words[SPELLING_LEVELS.EASY];
      break;
  }

  res.json(result);
});

router.post('/grade', (req, res) => {
  // TODO: extract original word, spelling and level, get diff, return response
})

export default router;
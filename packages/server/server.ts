/* eslint-disable no-restricted-globals */
import express, { Request, Response } from 'express';
import DocumentDiffStrategy from './diffStrategies/DocumentDiffStrategy';


const app: express.Application = express();

const port = 3001;

app.use(express.json());

app.get('/diff', (req: Request, res: Response) => {
  const { fromIndex = 0, toIndex = 100 } = req.query;

  const fromIndexInt = parseInt(fromIndex as string);
  if (isNaN(fromIndexInt)) {
    throw new Error('fromIndex should be an integer');
  }

  const toIndexInt = parseInt(toIndex as string);
  if (isNaN(toIndexInt)) {
    throw new Error('toIndex should be an integer');
  }

  if (toIndexInt < fromIndexInt) {
    throw new Error(`toIndex can't be less than fromIndex`);
  }

  console.log('calculating diffs...');
  const documentsDiffStrategy = new DocumentDiffStrategy();
  const diffPairs = documentsDiffStrategy.getDiffPairs([{}], [{}], {
    uniqueKey: 'id'
  });
  const diffRes = documentsDiffStrategy.getDiffs(diffPairs);
  // const diffRes = getDiffs(fromIndexInt, toIndexInt);
  console.log('done calculating diffs...');

  const data = {
    documentDiffs: diffRes,
    totalDocuments: 2,
  };

  res.json(data);
});

app.listen(port);
console.log('app listening on port', port);
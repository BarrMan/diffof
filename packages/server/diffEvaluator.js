/* eslint-disable import/no-dynamic-require */
const { isEqual, keyBy } = require('lodash');
const path = require('path');
const fs = require('fs');

const { dumpPath } = require('./constants');

const equalSliceObject = (obj, fromIndex, toIndex) => {
  const slicedObj = {};
  let slicedAmount = 0;
  const amountToSlice = toIndex - fromIndex;

  Object.keys(obj).forEach(key => {
    slicedObj[key] = [];
  });

  try {
    Object.entries(obj).forEach(([prop, value]) => {
      slicedObj[prop] = value.slice(fromIndex, fromIndex + amountToSlice - slicedAmount);
      slicedAmount += slicedObj[prop].length;

      if (slicedAmount === amountToSlice) {
        throw new Error();
      }
    });
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return slicedObj;
};

const getHashes = (fromSource, toSource) => {
  if (typeof fromSource !== 'string') {
    throw new Error('fromSource is not a string');
  }

  if (typeof toSource !== 'string') {
    throw new Error('toSource is not a string');
  }

  const fromSourcePath = path.join(dumpPath, fromSource);
  const toSourcePath = path.join(dumpPath, toSource);

  if (!fs.existsSync(fromSourcePath)) {
    throw new Error(`source path does not exist: ${fromSourcePath}`);
  }

  if (!fs.existsSync(toSourcePath)) {
    throw new Error(`toSource path does not exist: ${toSourcePath}`);
  }

  const currentRun = require(fromSourcePath);
  const previousRun = require(toSourcePath);

  return [keyBy(currentRun, '_id'), keyBy(previousRun, '_id')];
};

const getDiffs = (fromIndex, toIndex, fromSource, toSource) => {
  const [currentHashes, previousHashes] = getHashes(fromSource, toSource);
  const output = { added: [], removed: [], changed: [] };

  Object.entries(currentHashes).forEach(([id, document]) => {
    if (!previousHashes[id]) {
      output.added.push(document);
    } else if (!isEqual(document, previousHashes[id])) {
      output.changed.push([document, previousHashes[id]]);
    }
  });

  Object.entries(previousHashes).forEach(([id, document]) => {
    if (!currentHashes[id]) output.removed.push(document);
  });

  return {
    diffs: equalSliceObject(output, fromIndex, toIndex),
    total: output.added.length + output.removed.length + output.changed.length,
  };
};

module.exports = { getDiffs };

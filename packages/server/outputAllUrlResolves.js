const path = require('path');
const fs = require('fs');
const config = require('ni-node-configuration');
const RtDbRepoAsync = require('ni-crud').RtDbRepoAsync;
const urlResolveSchema = require('ni-entities').rt.urlResolve;

const { publishDb } = require('../../../lib/repositories/constants');

const urlResolveSchemaWithWriteConcern = Object.assign(urlResolveSchema, {
  writeConcern: { w: '1', j: true, wtimeout: 10000 },
});

const main = async () => {
  const { argv } = process;
  const [, , outputFileName] = argv;

  if (!outputFileName) {
    throw new Error(`${path.dirname(outputFileName)} does not exist`);
  }

  await config.initialize({ configDirectory: path.resolve(__dirname, '../../../config') });

  const urlRepo = new RtDbRepoAsync('url-resolve', urlResolveSchemaWithWriteConcern, publishDb);
  await urlRepo.init();

  console.log('fetching all url-resolves...');
  const urlResolves = await urlRepo.find({});

  const outputPath = path.resolve(__dirname, '../dump/', outputFileName);
  console.log(`writing url-resolves documents to ${outputPath}`);
  fs.writeFileSync(outputPath, JSON.stringify(urlResolves), {
    encoding: 'utf8',
    flag: 'w',
  });
  console.log('done writing documents...');

  process.exit(0);
};

main();

const { normalize, schema, denormalize } = require('normalizr');
const rawData = require('./holding');
const print = require('./print');

const user = new schema.Entity("users");

const company = new schema.Entity("companies", {
  gerente: user,
  encargado: user,
  empleados: [user],
});

const holding = new schema.Entity("holdings", {
  empresas: [company],
  empresasDestacadas: [company],
});

const normalizedData = normalize(rawData, holding);
console.log('NORMALIZADA')
console.log(JSON.stringify(normalizedData, null, 2));
print.examine(normalizedData);

const denormalizedData = denormalize(normalizedData.result, holding, normalizedData.entities);
console.log('DENORMALIZADA');
print.examine(denormalizedData);



var config = {
  PORT: getEnv('PORT') || 4000,
  CLIENT_ID: getEnv('CLIENT_ID'),
  SECRET_ID: getEnv('SECRET_ID'),
  TOKEN: getEnv('TOKEN'),
};

function getEnv(variable){
  console.log('var__'+variable)
  console.log('process.env.NODE_ENV__'+process.env.NODE_ENV)
  if (process.env.NODE_ENV != undefined && process.env[variable] === undefined){
    throw new Error('You must create an environment variable for ' + variable);
  }
  return process.env[variable];
};

function setEnv(key, value){
  process.env[key] = value;
};

module.exports = config;

var config = {
  PORT: getEnv('PORT') || 4000,
  CLIENT_ID: getEnv('CLIENT_ID') || '916444346637-7fdt8bt7hh4e2vca48ub09cpbomo5os0.apps.googleusercontent.com',
  SECRET_ID: getEnv('SECRET_ID') || 'iYvdnzrd5291KIRCRryn_OMX',
  TOKEN: getEnv('TOKEN'),
};

function getEnv(variable){
  if (process.env.NODE_ENV != undefined && process.env[variable] === undefined){
    throw new Error('You must create an environment variable for ' + variable);
  }
  return process.env[variable];
};

function setEnv(key, value){
  process.env[key] = value;
};

module.exports = config;

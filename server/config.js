let env = process.env.NODE_ENV || 'dev'

function config(envParam = {}) {
  let retConfig = {}
  env = envParam.NODE_ENV || env
  switch (env) {
  case 'production':
  case 'staging':
  case 'dev':
  case 'development':
  case 'test':
  default:
    retConfig = {
      database: {
        uri: 'postgres://postgres:password@mydbinstance.cl6nndci89hw.ap-southeast-1.rds.amazonaws.com/postgres',
        options: {
          pool: {
            max: 5,
            idle: 15000,
            acquire: 60000,
          },
          logging: false,
        },
      },
      api: {
        url: 'http://localhost',
        port: '3002',
      },
    }
    break
  }
  return retConfig
}

module.exports = config

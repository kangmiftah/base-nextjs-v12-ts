const appconfig =  {
   DATABASE_URL: process.env.DATABASE_URL,
   DATABASE_ENGINE:process.env.DATABASE_ENGINE,
   DATABASE_USER:process.env.DATABASE_USER,
   DATABASE_PASS:process.env.DATABASE_PASS,
   DATABASE_HOST:process.env.DATABASE_HOST,
   DATABASE_DB:process.env.DATABASE_DB,
   DATABASE_PORT:process.env.DATABASE_PORT,
   SECRET_KEY_JWT:process.env.SECRET_KEY_JWT
}

export default appconfig;
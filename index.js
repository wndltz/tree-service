require('@babel/register')
const fs = require('fs')
process.env.JWT_PUBLIC_KEY = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH)
require('./src/index')

'use strict'

import dotenv from 'dotenv'
import { filterObj } from 'easy-fns-ts/dist/lib'

export const loadEnv = () => {
  const env = process.env.NODE_ENV
  const envList = ['.env', `.env.${env}`, `.env.${env}.local`]

  envList.forEach((e) => {
    dotenv.config({
      path: e,
    })
  })

  const ret = {}
  for (const envName of Object.keys(process.env)) {
    let realName = process.env[envName].replace(/\\n/g, '\n')
    realName =
      realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }

    ret[envName] = realName
    process.env[envName] = realName
  }

  return filterObj(ret, 'VITE_')
}

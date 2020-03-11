#!/usr/bin/env node

import prompts from './prompts'
import program from './program'
;(async () => {
  if (process.argv && process.argv.length <= 2) {
    await prompts()
  } else {
    program()
  }
})()

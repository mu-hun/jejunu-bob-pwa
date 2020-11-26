import { writeFileSync } from 'fs'
import path from 'path'

import getLicenseList from './getLicenseList'
;(async () => {
  const latest = await getLicenseList()
  writeFileSync(
    path.resolve('src', 'tools', 'license', 'list.json'),
    JSON.stringify({ latest })
  )
})()

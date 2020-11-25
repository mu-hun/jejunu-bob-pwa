import licenseCrawler, { CrawlerOptions, Licenses } from 'npm-license-crawler'

const options: CrawlerOptions = {
  start: '.',
  onlyDirectDependencies: true,
  omitVersion: true,
  // @ts-ignore
  noColor: true
}

interface Dependence {
  name: string
  license: string
}

export default async function getLicenseList() {
  const production = await crawler({ production: true })
  const development = await crawler({ development: true })

  return production.concat(development)
}

function crawler(props: Pick<CrawlerOptions, 'development' | 'production'>) {
  return new Promise<Dependence[]>((resolve, reject) => {
    licenseCrawler.dumpLicenses({ ...options, ...props }, (error, data) => {
      if (error) {
        reject(error)
        return
      }
      const sorted = Object.entries(data)
        .map(filter)
        .sort(sort)
      resolve(sorted)
    })
  })
}

type FilterArguments = [string, Licenses[0]]

function filter([name, props]: FilterArguments): Dependence {
  const { licenses: license } = props
  return { name, license }
}

function sort(a: Dependence, b: Dependence) {
  return a.name.localeCompare(b.name)
}

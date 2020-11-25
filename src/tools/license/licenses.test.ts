import getLicenseList from './getLicenseList'
import list from './list.json'

test('Check dependency list synchronization', async () => {
  const latest = await getLicenseList()

  expect(list.latest).toEqual(latest)
})

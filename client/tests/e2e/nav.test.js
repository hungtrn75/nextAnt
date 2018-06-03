const timeout = 20000

describe(
  '/ (Nav Bar)',
  () => {
    let page

    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:3000')
    }, timeout)

    it('should show logo brand', async () => {
      const text = await page.$eval('span.brand-logo', el => el.innerHTML)
      expect(text).toEqual('CRM System Demo')
    })
  },

  timeout
)

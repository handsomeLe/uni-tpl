describe('login.vue', () => {
  let page
  beforeAll(async () => {
    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
    page = await program.reLaunch('/pages/login/login1')
    await page.waitFor(1000)
  })
  it('点击登录', async () => {
    const loginButton = await page.$('.subBtn');
    console.log(loginButton)
    expect(await loginButton.text()).toBe('登录')
  })
})

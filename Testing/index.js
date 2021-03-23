const { Builder, By } = require ("selenium-webdriver")
const chrome = require ("selenium-webdriver/chrome")

const options = new chrome.Options()
const GiftBox = async () => {
    let webDriver = await new Builder().forBrowser("chrome").setChromeOptions(options).build()
    await webDriver.get("https://giftbox-app.herokuapp.com")
    await webDriver.findElement(By.css("#headerContainer > div.headerUser.centerVerticalColumn > div.headerUserBottom.spaceBetween > a > div > p")).click()
    await webDriver.findElement(By.css("#root > div > div.editUsuario > div.modificarEmailUsuario > input[type=text]:nth-child(2)")).sendKeys("lucio10@gmail.com")
    await webDriver.sleep(3000)
    await webDriver.findElement(By.css("#root > div > div.editUsuario > div.modificarEmailUsuario > input[type=password]:nth-child(3)")).sendKeys("Lucio123")
    await webDriver.sleep(3000)
    await webDriver.findElement(By.css("#root > div > div.editUsuario > div.guardaCambioContraseña")).click()
    await webDriver.findElement(By.css("#headerContainer > div.headerUser.centerVerticalColumn > div.headerUserBottom.spaceBetween > a > div > div > div > div > div > p")).click()
   
  
}

GiftBox()

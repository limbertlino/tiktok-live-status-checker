import { Browser, Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

export const options = new Options();
options.addArguments('--headless', '--incognito');

export const initChromeDriver = async () => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  return driver;
};

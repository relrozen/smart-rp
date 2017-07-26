import { SmartRpPage } from './app.po';

describe('smart-rp App', () => {
  let page: SmartRpPage;

  beforeEach(() => {
    page = new SmartRpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

import { Ng2testPage } from './app.po';

describe('ng2test App', function() {
  let page: Ng2testPage;

  beforeEach(() => {
    page = new Ng2testPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

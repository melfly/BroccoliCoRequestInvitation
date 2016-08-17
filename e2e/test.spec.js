/**
 * Created by garyzhou on 8/16/16.
 */
'use strict';

describe('home page', function () {
  beforeEach(function () {
    browser.get('http://localhost:9999');
  });

  it('Home page should contain a header, a footer and a content. Content should contain button Request an invite', function () {

    expect(element(by.css('header'))).not.toBeNull();
    expect(element(by.css('footer'))).not.toBeNull();
    expect(element(by.css('content'))).not.toBeNull();
    expect(element(by.tagName('button')).getText()).toEqual('Request an invite');
  });

  it('Click the button should open a modal.', function () {
    element(by.tagName('button')).click();
    expect(element(by.css('modal-open'))).not.toBeNull();
  });
});

describe('Input modal', function () {
  var fullNameElem, emailElem, confirmEmailElem;

  var $q;

  beforeEach(function () {
    browser.get('http://localhost:9999');
    element(by.tagName('button')).click();
    fullNameElem = element(by.model('fullName'));
    emailElem = element(by.model('email'));
    confirmEmailElem = element(by.model('confirmEmail'));
  });

  it('Modal should have a form. The form should have 3 input fields', function () {
    expect(element(by.tagName('form')).getAttribute('name')).toEqual('inputForm');
    expect(element.all(by.tagName('input')).count()).toEqual(3);
  });

  it('Invalid fields will be highlighted when clicking send button', function () {

    fullNameElem.sendKeys('ab');
    emailElem.sendKeys('abd-123');
    confirmEmailElem.sendKeys('abd');
    element(by.tagName('button')).click();
    fullNameElem.getAttribute('class').then(function (value) {
      expect(value.indexOf('ng-invalid')).not.toEqual(-1);
    });
    emailElem.getAttribute('class').then(function (value) {
      expect(value.indexOf('ng-invalid')).not.toEqual(-1);
    });
    confirmEmailElem.getAttribute('class').then(function (value) {
      expect(value.indexOf('ng-invalid')).not.toEqual(-1);
    });
  });

  it('Should send a POST request to backend server. ' +
    'If backend service return a successful response, display successful pop-up', function () {
    fullNameElem.sendKeys('Gary Zhou');
    emailElem.sendKeys('garyzhou1978@gmail.com');
    confirmEmailElem.sendKeys('garyzhou1978@gmail.com');
    var sendBtn = element(by.tagName('button'));
    sendBtn.click();
    element(by.tagName('h3')).getText().then(function(value) {
      expect(value).toEqual('All done!');
    })
  })

  it('Should send a POST request to backend server if all fields are valid. ' +
    'If backend service return a error response, display error message on the modal', function () {
    fullNameElem.sendKeys('Gary Zhou');
    emailElem.sendKeys('usedemail@airwallex.com');
    confirmEmailElem.sendKeys('usedemail@airwallex.com');
    var sendBtn = element(by.tagName('button'));
    sendBtn.click();
    expect(element(by.css('text-danger'))).not.toBeNull();
  })

});
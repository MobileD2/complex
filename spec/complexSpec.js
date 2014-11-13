describe('Complex', function() {
  var $element;

  beforeEach(function () {
    $element = $('<input class="test-input" type="text" readonly>');
    $('body').append($element);
  });

  afterEach(function () {
    $('body').html('');
  });

  it('should showen when user has click on element', function () {
    $element.complex();
    $element.click();
    expect($('.complex-popup')).toHaveClass('open');
  });

  it('should hidden when user has click on body', function () {
    $element.complex();
    $element.click();
    $('body').click();
    expect($('.complex-popup')).not.toHaveClass('open');
  });

  it('should not hidden when user has click on popup', function () {
    $element.complex();
    $element.click();
    $('.complex-popup').click();
    expect($('.complex-popup')).toHaveClass('open');
  });

  it('should handle callback when user has change something in popup', function () {
    var value;

    $element.complex({
      onChange: function (event) {
        value = event.target.value;
      }
    });

    $('.complex-popup input').val('test');
    $('.complex-popup input').change();


    expect(value).toEqual('test');
  });

  it('should handle callback before show', function () {
    var flag = 0;
    var isOpen;

    $element.complex({
      beforeShow: function () {
        isOpen = $('.complex-popup').hasClass('open');
        flag = 1;
      }
    });

    $element.click();
    expect(flag).toEqual(1);
    expect(isOpen).toBe(false);
  });

  it('should handle callback after show', function () {
    var flag = 0;
    var isOpen;

    $element.complex({
      afterShow: function () {
        isOpen = $('.complex-popup').hasClass('open');
        flag = 1;
      }
    });

    $element.click();
    expect(flag).toEqual(1);
    expect(isOpen).toBe(true);
  });

  it('should handle callback before hide', function () {
    var flag = 0;
    var isOpen;

    $element.complex({
      beforeHide: function () {
        isOpen = $('.complex-popup').hasClass('open');
        flag = 1;
      }
    });

    $element.click();
    $('body').click();
    expect(flag).toEqual(1);
    expect(isOpen).toBe(true);
  });

  it('should handle callback after hide', function () {
    var flag = 0;
    var isOpen;

    $element.complex({
      afterHide: function () {
        isOpen = $('.complex-popup').hasClass('open');
        flag = 1;
      }
    });

    $element.click();
    $('body').click();
    expect(flag).toEqual(1);
    expect(isOpen).toBe(false);
  });

});

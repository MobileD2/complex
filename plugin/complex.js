(function($) {
  'use strict';

  var defaults = {
    popup: '<div class="complex-popup"><input type="text" value="test"/></div>',
    container: '<div class="complex-container"></div>',
    showClass: 'open',
    onChange: $.noop,
    beforeShow: $.noop,
    afterShow: $.noop,
    beforeHide: $.noop,
    afterHide: $.noop
  };

  function Complex (el, options) {
    this.$el = $(el);
    this.options = $.extend(defaults, options);
    this.$container = $(this.options.container);
    this.$el.wrap(this.$container);
    this.$container = this.$el.parent();
    this.initPopup();
    this.bind();
  }

  Complex.prototype.bind = function () {
    var that = this,
        $body = $('body');

    this.$el.on('click', function (event) {
      that.show(event);
    });

    this.$container.on('change', function (event) {
       that.onChange(event);
    });

    $body.on('click', function (event) {
      if (!$(event.target).closest(that.$container).length) that.hide(event);
    });

    $body.on('focusin', function (event) {
      if (!$(event.target).closest(that.$container).length) that.hide(event);
    });
  };

  Complex.prototype.initPopup = function () {
    this.$popup = $(this.options.popup);
    this.$el.after(this.$popup);
  };

  Complex.prototype.show = function (event) {
    event.preventDefault();
    event.stopPropagation();

    if ($.isFunction(this.options.beforeShow)) {
      this.options.beforeShow.call(this);
    }

    this.$popup.addClass(this.options.showClass);

    if ($.isFunction(this.options.afterShow)) {
      this.options.afterShow.call(this);
    }
  };

  Complex.prototype.hide = function (event) {
    if ($.isFunction(this.options.beforeHide)) {
      this.options.beforeHide.call(this);
    }

    this.$popup.removeClass(this.options.showClass);

    if ($.isFunction(this.options.afterHide)) {
      this.options.afterHide.call(this);
    }
  };

  Complex.prototype.onChange = function (event) {
    if ($.isFunction(this.options.onChange)) {
      this.options.onChange.call(this, event);
    }
  };

  Complex.prototype.getEl = function () {
    return this.$el;
  };

  $.fn.complex= function (options, params) {
    return this.each(function () {
      new Complex(this, options);
    });
  };

})(jQuery);

// Add masks to inputs
$(document).ready(function(){

  $(".js-input-mask--number").inputmask({
    "alias": "numeric",
    "groupSeparator": ",",
    "autoGroup": true,
    "digits": 0,
    "allowMinus": false,
    "rightAlign": false
  });

  $(".js-input-mask--currency").inputmask({
    "alias": "numeric",
    "groupSeparator": ",",
    "autoGroup": true,
    "placeholder": "",
    "digits": 2,
    "digitsOptional": true,
    "allowMinus": false,
    "rightAlign": false
  });

  $(".js-input-mask--percent").inputmask({
    "mask": "99",
    "placeholder": "",
    "allowMinus": false
  });

});

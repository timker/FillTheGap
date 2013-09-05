//this must load first
//next logic
//jquery?
//simple track focus?... no this needs to happen after top load...


var focusNavigator = (function() {
  //todo rename lastElementFocused to focusableElement
  nextItem = function(lastElementFocused){
    //should onlt be txt inputs,textarea
    var allInputs = $("input[type='text'],input[type='password']");
    console.log(allInputs);
    console.log(lastElementFocused);
    for (var i = 0; i < allInputs.length; i++) {
      if (allInputs[i] == lastElementFocused) {
        // todo I think this might be for checkboxes
        // while ((allInputs[i]).name == (allInputs[i + 1]).name) {
        //    i++;
        // }
        console.log("found");
        console.log(i + 1);
        console.log(allInputs.length);
        if ((i + 1) < allInputs.length) {
           $(allInputs[i + 1]).focus();
        } else {
           $(allInputs[0]).focus();
        }
      }
    }
  };

  return {
    next: function (lastElementFocused) {
      nextItem(lastElementFocused);
    },
  };


})();

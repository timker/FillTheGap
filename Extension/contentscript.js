

 (function() {

    $('#AT_Manuel_Root').remove();
     // this is to disable double loading
     // this could be used for a "close" button
     // if(document.getElementById('AT.Manuel.Root'))
     // {
     //   $(document.getElementById('AT.Manuel.Root')).remove();
     //   return;
     // }

    // todo should we add simpple html element as the next request/work might be slow
    $.get(chrome.extension.getURL('/template.html'), function(data) {
        $("body").after(data);
        //safer loading
        //could find the first ref to ng-app or put at bottom, to in AT.Manuel.Root 
      
        // Or if you're using jQuery 1.8+:
        // this might still work if we convert to element first, instead of text?
        // $($.parseHTML(data)).appendTo('body');

        var first = document.getElementById('AT_Manuel_Root');
        angular.element(first).ready(function() {
          //  console.log(first);
          angular.bootstrap(first);
        });
    });
})();



var pageAccessor = (function () {
  var lastElementFocused;
  
  init = function() {
    // todo this needs to be "live or on"
    // todo does not seem to cycle through ne elements
    $("*").on('blur', function(args) {
      //$( "*" ).blur(function(args) {
      // console.log("lost focus");
      lastElementFocused = args.currentTarget;
    });

  };

  nextItem = function(){
    //should onlt be txt inputs,textarea
    var allInputs = $("input,select");
    console.log(allInputs);
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

  init();

  return {
    setValue: function (value) {
      $(lastElementFocused).val(value);
      nextItem();
    },
  };

})();







function FillCtrl($scope)
{
  var loadData = function()
  {
    chrome.storage.sync.get('fillList', function(data) {
        console.log(data);
        $scope.fillList = data.fillList || [];
        $scope.$apply();
    });
  }

  $scope.addItem = function()
  {
    console.log($scope.newItemText);
    $scope.fillList.push({text:$scope.newItemText})
    console.log($scope.fillList);
    console.log({text:$scope.newItemText});
    $scope.newItemText = "";

    persist();
  }

  $scope.deleteItem = function(item)
  {
    console.log(item);
    var index = $scope.fillList.indexOf(item);
    if (index != -1) {
      $scope.fillList.splice(index, 1);    
      persist();
    }
  }

  $scope.ApplyItemToTextField = function(item)
  {
    pageAccessor.setValue(item.text);
  }


  $scope.close = function()
  {
    alert("close");
  }


var persist = function(){
  chrome.storage.sync.set({ fillList: $scope.fillList});
  chrome.storage.sync.getBytesInUse(null, function(ints){console.log(ints)})
}

  loadData();
}


 (function() {

    $('#AT_Manuel_Root').remove();
     // this is to disable double loading
     // this could be used for a "close" button
     // if(document.getElementById('AT.Manuel.Root'))
     // {
     //   $(document.getElementById('AT.Manuel.Root')).remove();
     //   return;
     // }

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







function TodoCtrl($scope)
{

  var loadData = function()
  {
  chrome.storage.local.get('todoList', function(data) {
        if (data.todoList)
          {
            console.log(data);
            $scope.todos = data.todoList;
            $scope.$apply();
          }
      });
  }

  $scope.totalTodos =4;

  $scope.addTodo = function()
  {
    $scope.todos.push({text:$scope.todoText, done:false})
    chrome.storage.local.set({ todoList: $scope.todos});
  }

$scope.ApplyItemToTextField = function(todo)
  {
  pageAccessor.setValue(todo.text);

  }

loadData();

}

//alert("ahhh");
//var xhr = new XMLHttpRequest();
//xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
//xhr.open("GET", chrome.extension.getURL('/data.json'), true);
//xhr.send()


// todo check dom element doesn't exist
  // get template, or show/hide

 (function(){

  $('#AT_Manuel_Root').remove();
     //if(document.getElementById('AT.Manuel.Root'))
     //{
      //$(document.getElementById('AT.Manuel.Root')).remove();
      
     // return;
     //}

  $.get(chrome.extension.getURL('/template.html'), function(data) {
   
     // $(data).appendTo('body');
      $("body").after(data);

      //safer loading
      //could find the first ref to ng-app or put at bottom, to in AT.Manuel.Root 
      

      // Or if you're using jQuery 1.8+:
      // $($.parseHTML(data)).appendTo('body');

     var first = document.getElementById('AT_Manuel_Root');


    	angular.element(first).ready(function() {
     // alert("moo");
    console.log(first);

  //chrome.storage.local.get  
          //angular.bootstrap(document);
          angular.bootstrap(first);

  //also should remove head/ etc etc

  // this might still work if we convert to element first, instead of text?
        // angular.bootstrap( data);
         });

  });
})();

//$.ajax({
//  url: chrome.extension.getURL('/template.html')

//}).done(function ( data ) {
//  console.log("data");
//  console.log(data);
//});

var lastItem = function()
{
  var lastElementFocused;

  

  var setValue = function(text)
  {
    alert("c");
  }

}


var testModule = (function () {
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
                  //}
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
    //alert(value);
    },

    
  };

})();




//this should only run once
//todo  also make this a live/on event
//only needs to be inputs?




function getURLInfo(url,callback)
{
    var xhr = new XMLHttpRequest();
    xhr.open
        (
            "GET",
            url,
            true
        );
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4)
        {
        	console.log(xhr.responseText);
        	callback(xhr.responseText);
            //return JSON.parse(xhr.responseText);
           // console.log(JSON.parse(xhr.responseText));
        }
    }
}


//getURLInfo(chrome.extension.getURL('/data.json'));


//getURLInfo(chrome.extension.getURL('/template.html'), function(data){
//console.log(data);

//});



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
      //  console.log($(":active"));
    //console.log(document.activeElement);
    //$(document.activeElement).val(todo.text);
    //alert();
//lastItem.setValue(todo.text);
testModule.setValue(todo.text);
//next elelment focus

  }

loadData();

}

//alert("ahhh");
//var xhr = new XMLHttpRequest();
//xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
//xhr.open("GET", chrome.extension.getURL('/data.json'), true);
//xhr.send()


// todo check dom element doesn't exist
// get template, or show/hide
$.get(chrome.extension.getURL('/template.html'), function(data) {
 
   // $(data).appendTo('body');
    $("body").after(data);

    //safer loading
    //could find the first ref to ng-app or put at bottom, to in AT.Manuel.Root 
    

    // Or if you're using jQuery 1.8+:
    // $($.parseHTML(data)).appendTo('body');

   var first = document.getElementById('AT.Manuel.Root');


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


$.ajax({
  url: chrome.extension.getURL('/template.html')

}).done(function ( data ) {
  console.log("data");
  console.log(data);
});


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
//$scope.todos = [{text: 'larn ang',done:false},{text:'blah',done:false}];
$scope.addTodo= function()
{$scope.todos.push({text:"new", done:false})}

loadData();

}
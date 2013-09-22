

 (function() {

    $('ftg').remove();
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

       // var first = document.getElementById('AT_Manuel_Root');
       // angular.element(first).ready(function() {
          //  console.log(first);
       //   angular.bootstrap(first);
       // });


    //ftg wrapper
var shadow = document.querySelector('#AT_Manuel_Root').webkitCreateShadowRoot();
var template = document.querySelector('#ftgtemplate');
shadow.appendChild(template.content);

//possible race condition
fillController.setup();
//fillController.renderList();
//fillCtrl
    });
})();



console.log(focusNavigator);
//this won't work if iframe is created after form filler... super minor bug, may need to reinject on iframe load
var focusTracer = (function(focusNavigator) {
  var currentValidFocus;

  var frameSource = null;

  function receiveMessage(event)  {
    //alert("revice");
    //would it be worth checking that active tab is an iframe here?
        console.log(event);
        currentValidFocus = null;
        frameSource = event.source;
        console.log("frameSource");
        console.log(frameSource);
        //we might be able to keep connection to origin frame
        //https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
  };
  //
  init = function(){
    //todo only if a input/iframe and not in AT_Manuel_Root 
    //content script is loaded only on input/contenteditable so this should be safe (as log as this loads fast)
    currentValidFocus = document.activeElement;

    window.addEventListener("message",receiveMessage , false);
  
    //document.activeElement.tagName
    $(document).focusin(function(e) {
      //console.log(this);
      //console.log(e);
      console.log("focusin:" + e.target.tagName);
      console.log("ActiveDoc:" + document.activeElement.tagName);
      
      //why are we using activeElement instead of e.target?
      currentValidFocus = document.activeElement;
      frameSource = null;

    });
    $(document).focusout(function(e) {
     // console.log(this);
     // console.log(e);
     // console.log(e.target);
      console.log("focusout:" + e.target.tagName);
      console.log("ActiveD:" + document.activeElement.tagName)
     // $(this).find("span").css('display','inline').fadeOut(1000);
    });

  };

  init();

return {
    setValue: function (value) {
      if(frameSource)
      {
        //don't pass iframeActive
        frameSource.postMessage({setValue:value},"*");
      }
      else{
       
        $(currentValidFocus).val(value);
        focusNavigator.next(currentValidFocus);
      }
     // nextItem();
    }
  };

})(focusNavigator);



var fillController = (function ()
{
  var fillList;

  function close()
  {
    $('ftg').remove();
  }

  function add(event)
  {
    event.preventDefault();
    var addText = $("#addText").val();
    $("#addText").val("");

    fillList.push({text:addText});

    persist();
    renderList();
  }

function getItemId(element)
{
var index = $(element).closest("#fillItemContainer").data("data-index");
console.log(index);

}
function applyItemToTextField()
{
alert('d');

}

  var persist = function(){
    console.log(fillList);
    chrome.storage.sync.set({ fillList: fillList});
  }

  function init() {
    var template ="{#fillList}<li  data-index='{$idx}' class='fillItemContainer' ><div><a class='fillItem'>({$idx}){text} {@idx}{.}{/idx} </a><a class='fillItemDelete'>✖</a>         </div>          </li>{/fillList}";
    var compiled = dust.compile(template, "list");
    dust.loadSource(compiled);

    console.log($("ftg .close").length);
  }

  function renderList()
  {
    chrome.storage.sync.get('fillList', function(data) {
      fillList = data;
      console.log(data);
      dust.render("list", fillList, function(err, out) {
        $('ftg inner').empty();
        $('ftg inner').append($.parseHTML(out));
        console.log(out);
      });
    });
  }

  function setup()
  {
    renderList();
    $("ftg .close").click(close);
    $("ftg form").submit(add);
    $("ftg").on("click", "li .fillItem",applyItemToTextField);
  }

  init();

  return {
    setup: function () {
      setup();
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
    console.log(document.activeElement.tagName);
    //pageAccessor.setValue(item.text);
    focusTracer.setValue(item.text);
  }

var persist = function(){
  chrome.storage.sync.set({ fillList: $scope.fillList});
  chrome.storage.sync.getBytesInUse(null, function(ints){console.log(ints)})
}

  loadData();
}
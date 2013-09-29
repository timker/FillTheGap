 

//console.log(w);
if (window != top) {
	
  //  parent.postMessage({fromExtension:true}, '*');
   // addEventListener('message', function(event) {
    //    if (event.data && event.data.inserHTML) {
    //        document.execCommand('insertHTML', false, event.data.insertHTML);
     //   }
   



//todo bug this loads twice if we context twice
(function(focusNavigator) {
  var currentValidFocus;
 


  function receiveMessage(event)  {
   // alert("set iframe value");
console.log(event);
        $(currentValidFocus).val(event.data.setValue);
        // todo remove jquery from being loaded if we don't need it
        focusNavigator.next(currentValidFocus);
        //we might be able to keep connection to origin frame
        //https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
  };

  init = function() {
    //intial active element
    console.log("intial active element:" + document.activeElement.tagName)
    console.log(document.activeElement)
    // todo does this work with active element
    console.log($(':focus'));
    // was this the element in focus (clicked)
    if($(':focus').length >0)
    {
      //dup code
        currentValidFocus = document.activeElement;
        parent.postMessage({iframeActive:true},"*");
    }  

    $(document).focusin(function(e) {
      console.log("focusin_scr:" + e.target.tagName);
      console.log("ActiveDoc_scr:" + document.activeElement.tagName)
      
      // todo dup code
      currentValidFocus = document.activeElement;
      parent.postMessage({iframeActive:true},"*");
// post message
//todo if in focus on "open" set and alert parent... this means that this script must be inserted last

    });
     window.addEventListener("message",receiveMessage , false);
  };

  init();
})(focusNavigator);









   }




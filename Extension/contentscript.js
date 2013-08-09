
//alert("ahhh");
//var xhr = new XMLHttpRequest();
//xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
//xhr.open("GET", chrome.extension.getURL('/data.json'), true);
//xhr.send()


$.get(chrome.extension.getURL('/template.html'), function(data) {
    $(data).appendTo('body');
    // Or if you're using jQuery 1.8+:
    // $($.parseHTML(data)).appendTo('body');

  	angular.element(document).ready(function() {
   // alert("moo");
         angular.bootstrap(document);
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

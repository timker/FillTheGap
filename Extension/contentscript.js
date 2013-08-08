
alert("ahhh");
//var xhr = new XMLHttpRequest();
//xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
//xhr.open("GET", chrome.extension.getURL('/data.json'), true);
//xhr.send()



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
            //return JSON.parse(xhr.responseText);
            console.log(JSON.parse(xhr.responseText));
        }
    }
}


getURLInfo(chrome.extension.getURL('/data.json'));


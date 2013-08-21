console.log("loading");

chrome.contextMenus.create(
{
  "title": "Fill This Gap",
  "type":"normal",
  "id": "show",
  "contexts":["editable"]
});

function onContextClickHandler(info, tab) {
//	chrome.tabs.executeScript(null, {file: "content_script.js"});
	console.log("clicked");
	
// maybe this should be have a call back
	chrome.tabs.insertCSS(null, { file: "content.css" });
	chrome.tabs.executeScript(null, { file: "Scripts/jquery-2.0.3.js" }, function() {
		console.log("jqueryloaded");
		chrome.tabs.executeScript(null, { file: "Scripts/angular.js" }, function() {
			chrome.tabs.executeScript(tab.tabId, {file: "contentscript.js"});
		});
	});
		
//chrome.tabs.executeScript(tab.tabId, {file: "contentscript.js"});
//hrome.tabs.executeScript(null, { file: "content.js" });

}

chrome.contextMenus.onClicked.addListener(onContextClickHandler); 

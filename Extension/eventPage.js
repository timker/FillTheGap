




console.log("loading");


chrome.storage.local.set({fieldList: ["tim","rules","potatoes"]});
chrome.storage.local.set({ todoList: [{text: 'larssssssn ang',done:false},{text:'blah',done:false}]});



  chrome.contextMenus.create(
{
	"title": "Show Fill",
  "type":"normal",
  "id": "show"
});

function onContextClickHandler(info, tab) {
//	chrome.tabs.executeScript(null, {file: "content_script.js"});
	console.log("clicked");
	//chrome.tabs.executeScript(integer tabId, InjectDetails details, function callback)
	//chrome.tabs.executeScript(tab.tabId, {code : "alert('yo');"});

	chrome.tabs.executeScript(null, { file: "Scripts/jquery-2.0.3.js" }, function() {
		console.log("jqueryloaded");
		chrome.tabs.executeScript(null, { file: "Scripts/angular.js" }, function() {
			chrome.tabs.executeScript(tab.tabId, {file: "contentscript.js"});
		});
	});
		
//chrome.tabs.executeScript(tab.tabId, {file: "contentscript.js"});
//hrome.tabs.executeScript(null, { file: "content.js" });

}

// todo
function executeScripts(array)
{


}

 chrome.contextMenus.onClicked.addListener(onContextClickHandler); 

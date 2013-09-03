console.log("loading");

chrome.contextMenus.create(
{
  "title": "Fill This Gap",
  "type":"normal",
  "id": "show",
  "contexts":["editable"]
});


function onContextClickHandler(info, tab) {

	console.log("clickedin");
	console.log(tab.id);

	console.time("InjectAll");
	console.time("InjectCss");
	chrome.tabs.insertCSS(tab.id, { file: "content.css" });
	console.timeEnd("InjectCss");
	// todo don't inject jquery into every frame
	console.time("InjectJ");
	chrome.tabs.executeScript(tab.id, { file: "Scripts/jquery-2.0.3.js", allFrames : true }, function() {
		console.timeEnd("InjectJ");
		console.time("InjectShared");
		chrome.tabs.executeScript(tab.id, { file: "sharedContent.js" , allFrames : true }, function() {
			console.timeEnd("InjectShared");
			//console.time("InjectPoly");
			//chrome.tabs.executeScript(tab.id, { file: "bower_components/polymer/polymer.min.js" }, function() {
			//console.timeEnd("InjectPoly");
				console.time("InjectAnj");
				chrome.tabs.executeScript(tab.id, { file: "Scripts/angular.js" }, function() {
					console.timeEnd("InjectAnj");
					console.time("InjectCS");

					chrome.tabs.executeScript(tab.id, {file: "contentscript.js"}, function(){
					console.timeEnd("InjectCS");

						chrome.tabs.executeScript(tab.id, {file: "iframeContentScript.js",allFrames :true},function(){console.timeEnd("InjectAll");});	
					});
			
				});
			//});
		});
	});		
}

chrome.contextMenus.onClicked.addListener(onContextClickHandler); 

//POP-1.JS

document.querySelector('.openModal').addEventListener('click', function(){

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {command: "openModal"});
  });
});

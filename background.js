chrome.contextMenus.create({
  id: "showCSS",
  title: "Show CSS",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "showCSS") {
    chrome.tabs.sendMessage(tab.id, { action: "getCSS" });
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 400,
      height: 300,
    });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.cssProperties) {
    chrome.runtime.sendMessage({ cssProperties: message.cssProperties });
  }
});

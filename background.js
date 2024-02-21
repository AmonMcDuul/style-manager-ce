chrome.contextMenus.create({
  id: "showBorders",
  title: "Show borders",
  contexts: ["all"],
});

chrome.contextMenus.create({
  id: "toggleBorderOnHover",
  title: "Toggle border on hover",
  contexts: ["all"],
});

chrome.contextMenus.create({
  id: "toggleCssOnHover",
  title: "Toggle css on hover",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "showBorders") {
    chrome.tabs.sendMessage(tab.id, { action: "showBorders" });
  }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "toggleBorderOnHover") {
    chrome.tabs.sendMessage(tab.id, { action: "toggleBorderOnHover" });
  }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "toggleCssOnHover") {
    chrome.tabs.sendMessage(tab.id, { action: "toggleCssOnHover" });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.cssProperties) {
    chrome.runtime.sendMessage({ cssProperties: message.cssProperties });
  }
});

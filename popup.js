function displayCSS(cssProperties) {
  var cssText = "";
  for (var prop in cssProperties) {
    cssText += `${prop}: ${cssProperties[prop]};\n`;
  }
  document.getElementById("element-selector").value = cssText;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("popup");
  if (message.cssProperties) {
    displayCSS(message.cssProperties);
  }
});

document
  .getElementById("element-selector")
  .addEventListener("input", function (event) {
    var cssText = event.target.value;
    chrome.runtime.sendMessage({ action: "updateCSS", cssText: cssText });
  });

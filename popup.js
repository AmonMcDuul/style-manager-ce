function applyCSSChanges(clickedElement, cssText) {
  clickedElement.style.cssText = cssText;
}

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
    var clickedElement = document.querySelector(".clicked-element");
    if (clickedElement) {
      console.log("inpuut");
      applyCSSChanges(clickedElement, cssText);
    }
  });

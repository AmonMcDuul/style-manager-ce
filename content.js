let previousClickedElement = null;

function addBorder(element) {
  if (previousClickedElement) {
    previousClickedElement.style.border = "none";
    previousClickedElement.classList.remove("clicked-element");
  }

  element.style.border = "2px solid red";
  element.classList.add("clicked-element");

  previousClickedElement = element;
}

function getCSSProperties(clickedElement) {
  var cssProperties = {};

  for (var i = 0; i < document.styleSheets.length; i++) {
    var styleSheet = document.styleSheets[i];
    var cssRules = styleSheet.cssRules || styleSheet.rules;
    if (!cssRules) continue;
    for (var j = 0; j < cssRules.length; j++) {
      var cssRule = cssRules[j];
      if (clickedElement.matches(cssRule.selectorText)) {
        for (var k = 0; k < cssRule.style.length; k++) {
          var propertyName = cssRule.style[k];
          var propertyValue = cssRule.style.getPropertyValue(propertyName);
          cssProperties[propertyName] = propertyValue;
        }
      }
    }
  }

  return cssProperties;
}

document.addEventListener("click", function (event) {
  var clickedElement = event.target;
  addBorder(clickedElement);
  getCSSProperties(clickedElement);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getCSS") {
    var clickedElement = document.activeElement;
    var cssProperties = getCSSProperties(clickedElement);
    chrome.runtime.sendMessage({ cssProperties: cssProperties });
  }
});

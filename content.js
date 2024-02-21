var showCssOnHover = false;

let previousClickedElement = null;

function addBorder(element) {
  if (previousClickedElement) {
    previousClickedElement.style.outline = "none";
    previousClickedElement.classList.remove("clicked-element");
  }

  removePersistantBorders();

  element.style.outline = "2px solid red";
  element.classList.add("clicked-element");

  previousClickedElement = element;
}

function addPersistantBorder(element) {
  element.style.outline = "1px solid red";
  element.classList.add("persistant-border-element");
}

function removePersistantBorders() {
  var elements = document.querySelectorAll(".persistant-border-element");
  elements.forEach(function (element) {
    element.style.outline = "none";
  });
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
  showCssOnHover = true;
  displayHoveredElementCSS(event);
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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  showCssOnHover = true;
  if (message.action === "showBorders") {
    var allElements = document.body.querySelectorAll("*");
    allElements.forEach(function (element) {
      addPersistantBorder(element);
    });
  }
});

function displayCSSPopup(cssProperties, x, y) {
  var popup = document.createElement("div");
  popup.id = "css-popup";
  popup.style.position = "fixed";
  popup.style.top = y + "px";
  popup.style.left = x + "px";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid black";
  popup.style.padding = "10px";
  popup.style.zIndex = "9999";

  var propertiesList = document.createElement("ul");

  for (var prop in cssProperties) {
    var listItem = document.createElement("li");
    listItem.textContent = `${prop}: ${cssProperties[prop]}`;
    propertiesList.appendChild(listItem);
  }

  popup.appendChild(propertiesList);
  document.body.appendChild(popup);
}

function removeCSSPopup() {
  var popup = document.getElementById("css-popup");
  if (popup) {
    popup.remove();
  }
}

function displayHoveredElementCSS(event) {
  if (showCssOnHover) {
    var hoveredElement = event.target;
    var cssProperties = getCSSProperties(hoveredElement);
    var x = event.clientX;
    var y = event.clientY;
    removeCSSPopup();
    displayCSSPopup(cssProperties, x, y);
  }
}

document.addEventListener("mouseover", displayHoveredElementCSS);
document.addEventListener("mouseout", removeCSSPopup);

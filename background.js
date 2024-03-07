// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (
//     tab.url &&
//     tab.url.includes("https://www.facebook.com/marketplace/item/")
//   ) {
//     const queryParameter = tab.url.split("item/");
//     const urlParameters = queryParameter[1];
//     console.log(urlParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       productId: urlParameters,
//     });
//   }
// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (
//     tab.url &&
//     tab.url.includes("https://www.facebook.com/marketplace/item/")
//   ) {
//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       productId: getProductIdFromUrl(tab.url),
//     });
//   }
// });

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   const currentTab = tabs[0];
//   if (currentTab && currentTab.status === "complete") {
//     chrome.tabs.sendMessage(currentTab.id, {
//       type: "NEW",
//       productId: getProductIdFromUrl(currentTab.url),
//     });
//   }
// });

// function getProductIdFromUrl(url) {
//   const queryParameter = url.split("item/");
//   return queryParameter[1];
// }

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    // Extension was just installed
    chrome.action.setPopup({ popup: "popup.html" });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "GET_API_KEY") {
    chrome.storage.local.get("apiKey", function (data) {
      const apiKey = data.apiKey;
      sendResponse({ apiKey: apiKey });
    });
    return true;
  }
});

let previousProductId = "";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    tab.url &&
    tab.url.includes("https://www.facebook.com/marketplace/item/")
  ) {
    const queryParameter = tab.url.split("item/");
    const urlParameters = queryParameter[1];
    console.log(urlParameters);

    if (urlParameters !== previousProductId) {
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        productId: urlParameters,
      });

      // Update the previous product ID
      previousProductId = urlParameters;
    }
  }
});

// chrome.runtime.onMessage.addListener((message, sender, response) => {
//   if (message.type === "OPEN_POPUP") {
//     // Open the popup.html
//     chrome.windows.create({
//       type: "popup",
//       url: "popup.html",
//       width: 600,
//       height: 700,
//     });
//   }
// });
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // if (message.type === "NEW") {
//   //   console.log("Received title:", message.title);
//   //   // Send the title to the popup
//   //   chrome.runtime.sendMessage({ type: "SHOW_POPUP", title: message.title });
//   // }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "NEW") {
//     console.log("Received title:");

//     chrome.runtime.sendMessage({ type: "SHOW_POPUP", title: message.title });

//   }
// });

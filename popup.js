// document.addEventListener("DOMContentLoaded", function () {
//   // Retrieve stored information from localStorage
//   const productInfo = JSON.parse(localStorage.getItem("productInfo")) || {};

//   // Function to update content based on element and key
//   const updateContent = (elementId, key, isImage = false) => {
//     const element = document.getElementById(elementId);
//     if (element) {
//       if (isImage) {
//         element.src = productInfo[key] || "";
//       } else {
//         element.textContent = productInfo[key] || "";
//       }
//     }
//   };

//   // Update the content in popup.html
//   updateContent("productImage", "imageSrc", true);
//   updateContent("productTitle", "title");
//   updateContent("productPrice", "price");
//   updateContent("productLocation", "location");
//   updateContent("productCondition", "condition");
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "SHOW_POPUP") {
//     const title = message.title;
//     // Handle the title in your popup (e.g., update HTML content)
//     console.log("Popup received title:", title);
//     const titleContainer = document.getElementById("productTitle");
//     if (titleContainer) {
//       titleContainer.textContent = title;
//     }
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "SHOW_POPUP") {
//     const title = message.title;
//     console.log("Popup received title:", title);

//     const titleContainer = document.getElementById("productTitle");
//     if (titleContainer) {
//       titleContainer.textContent = title;
//     }

//     sendResponse("Popup received the title successfully!");
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  const apiKeyArea = document.getElementById("provide-key");
  const apiKeyInput = document.getElementById("apiKeyInput");
  const saveApiKeyButton = document.getElementById("saveApiKey");
  const apiKeyAcceptedMessage = document.getElementById(
    "apiKeyAcceptedMessage"
  );

  // chrome.storage.local.get("apiKey", function (data) {
  //   const apiKey = data.apiKey;
  //   if (apiKey) {
  //     apiKeyArea.style.display = "none";
  //     apiKeyAcceptedMessage.style.display = "block";
  //   }
  // });

  function updatePopupContent() {
    chrome.storage.local.get("apiKey", function (data) {
      const apiKey = data.apiKey;

      if (apiKey) {
        apiKeyArea.style.display = "none";
        apiKeyAcceptedMessage.style.display = "block";
      } else {
        apiKeyArea.style.display = "block";
        apiKeyAcceptedMessage.style.display = "none";
      }
    });
  }

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.type === "API_KEY_REMOVED") {
      // Update the popup content when the API key is removed
      updatePopupContent();
    }
  });

  updatePopupContent();

  saveApiKeyButton.addEventListener("click", function () {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.local.set({ apiKey: apiKey }, function () {
        apiKeyArea.style.display = "none";
        // saveApiKeyButton.style.display = "none";
        apiKeyAcceptedMessage.style.display = "block";

        alert("API key accepted!");
        window.close();
      });
    } else {
      alert("Please enter a valid API key.");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const settingIcon = document.getElementById("settingIcon");
  const settingBox = document.getElementById("settingBox");

  settingIcon.addEventListener("click", function () {
    settingBox.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const changeApiKeyBtn = document.getElementById("changeApiKeyBtn");

  changeApiKeyBtn.addEventListener("click", function () {
    // chrome.tabs.create({ url: "settings.html" });
    chrome.windows.create({
      type: "popup",
      url: "settings.html",
      width: 600,
      height: 600,
    });
  });
});

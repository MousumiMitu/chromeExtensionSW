document.addEventListener("DOMContentLoaded", function () {
  const apiKeyInput = document.getElementById("apiKeyInput");
  const saveApiKeyBtn = document.getElementById("saveApiKeyBtn");
  const removeApiKeyBtn = document.getElementById("removeApiKeyBtn");

  // Load the existing API key from storage
  chrome.storage.local.get(["apiKey"], function (result) {
    const existingApiKey = result.apiKey || "";
    apiKeyInput.value = existingApiKey;
  });

  saveApiKeyBtn.addEventListener("click", function () {
    const newApiKey = apiKeyInput.value;

    chrome.storage.local.set({ apiKey: newApiKey }, function () {
      console.log("API Key saved:", newApiKey);

      closeCurrentWindow();
    });
  });

  removeApiKeyBtn.addEventListener("click", function () {
    chrome.storage.local.remove("apiKey", function () {
      closeCurrentWindow();
      chrome.runtime.sendMessage({ type: "API_KEY_REMOVED" });
    });
  });

  function closeCurrentWindow() {
    chrome.windows.getCurrent(function (currentWindow) {
      chrome.windows.remove(currentWindow.id);
    });
  }
});

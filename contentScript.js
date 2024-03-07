(() => {
  let currentProduct = "";
  let apiKey = "";

  chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    const { type, productId } = obj;

    if (type === "NEW") {
      console.log("new product enter");

      currentProduct = productId;
      getApiKey();
    }
  });

  function getApiKey() {
    chrome.runtime.sendMessage({ type: "GET_API_KEY" }, (response) => {
      apiKey = response.apiKey;
      if (apiKey) {
        setTimeout(() => {
          addSwojonBtn();
        }, 1000);
      } else {
        console.log("API key not available.");
      }
    });
  }

  function addSwojonBtn() {
    // console.log("addSwojonBtn called with API key:", apiKey);

    var createBtn = document.createElement("input");
    createBtn.value = "generate ad";
    createBtn.id = "generate-add";
    createBtn.type = "submit";

    const container = document.querySelector(
      ".xyamay9.x1pi30zi.x18d9i69.x1swvt13"
    );

    const existingButton = document.getElementById("generate-add");

    if (!existingButton) {
      return container.appendChild(createBtn);
    }

    createBtn.addEventListener("click", function () {
      // console.log("Button clicked");

      const header = container.querySelector("h1");
      const imageElement = document.querySelector(".x78zum5.x1vjfegm .xz74otr");
      const price = document.querySelector(
        ".x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x676frb.x1lkfr7t.x1lbecb7.xk50ysn.xzsf02u"
      );
      const location = document.querySelector(".x1xmf6yo .x1yztbdb .x193iq5w");

      const condition = document.querySelector(
        ".xu06os2.x1ok221b .x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h  .x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x6prxxf.xvq8zen.xo1l8bm.xzsf02u"
      );

      const title = header ? header.textContent : "";

      const productInfo = {
        userKey: apiKey,
        title: title,
        imageSrc: imageElement ? imageElement.src : "",
        price: price ? price.textContent.trim()[1] : "",
        location: location ? location.textContent.trim() : "",
        condition: condition ? condition.textContent : "",
      };

      if (apiKey) {
        postDataToApi(productInfo, createBtn);
      } else {
        console.log("API key not available.");

        createBtn.disabled = false;
      }
    });
  }

  function postDataToApi(data, buttonElement) {
    const jsonPlaceholderUrl = "https://jsonplaceholder.typicode.com/posts";

    fetch(jsonPlaceholderUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        body: JSON.stringify(data),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Data sent to JSONPlaceholder:", result);

        showAlert("Data sent successfully!");
        buttonElement.disabled = false;
      })
      .catch((error) => {
        console.error("Error sending data to JSONPlaceholder:", error);

        showAlert("Error sending data. Please try again.");
        buttonElement.disabled = false;
      });
  }

  function showAlert(message) {
    alert(message);
  }
})();

// function handleLocationChange() {
//   if (window.location.pathname.startsWith("/marketplace/item/")) {
//     console.log("Handle Location Change Locked and Loaded");

//     const listingEl = document.querySelector(
//       ".x78zum5.x1q0g3np.x1iyjqo2.x5yr21d.xh8yej3.xvrxa7q"
//     );

//     if (listingEl === null) {
//       console.log("Listing not found");
//       return;
//     }

//     if (listingEl !== null) {
//       console.log("Listing found");
//       addSwojonBtn(listingEl);
//     }
//   }
// }

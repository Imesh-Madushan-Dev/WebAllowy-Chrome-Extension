document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const enableToggle = document.getElementById("enableToggle");
  const newSiteInput = document.getElementById("newSite");
  const addSiteButton = document.getElementById("addSite");
  const siteList = document.getElementById("siteList");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const exportButton = document.getElementById("exportList");
  const importButton = document.getElementById("importList");
  const importFile = document.getElementById("importFile");

  // Load current settings
  loadSettings();

  // Event listeners
  enableToggle.addEventListener("change", toggleFiltering);
  addSiteButton.addEventListener("click", addSite);
  newSiteInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addSite();
  });
  exportButton.addEventListener("click", exportAllowlist);
  importButton.addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", importAllowlist);

  // Tab navigation
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      // Update active tab button
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Show active tab content
      tabContents.forEach((content) => {
        if (content.id === tabId) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
    });
  });

  function loadSettings() {
    chrome.storage.local.get(["allowedSites", "isEnabled"], (result) => {
      const { allowedSites = [], isEnabled = true } = result;
      enableToggle.checked = isEnabled;
      updateStatusIndicator(isEnabled, allowedSites.length);
      renderSiteList(allowedSites);
    });
  }

  function updateStatusIndicator(isEnabled, sitesCount) {
    const statusText = document.getElementById("statusText");
    const sitesCountElement = document.querySelector(".sites-count");

    if (statusText) {
      statusText.textContent = isEnabled ? "ON" : "OFF";
    }

    if (sitesCountElement) {
      sitesCountElement.textContent = `${sitesCount} site${
        sitesCount !== 1 ? "s" : ""
      } allowed`;
    }
  }

  function renderSiteList(sites) {
    siteList.innerHTML = "";

    if (sites.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "No sites added yet";
      emptyItem.style.fontStyle = "italic";
      emptyItem.style.color = "#999";
      siteList.appendChild(emptyItem);
      return;
    }

    sites.forEach((site) => {
      const li = document.createElement("li");

      const siteText = document.createElement("span");
      siteText.textContent = site;
      siteText.className = "site-item-text";

      const removeButton = document.createElement("button");
      removeButton.innerHTML = "&times;";
      removeButton.className = "remove-btn";
      removeButton.title = "Remove site";
      removeButton.addEventListener("click", () => removeSite(site));

      li.appendChild(siteText);
      li.appendChild(removeButton);
      siteList.appendChild(li);
    });
  }

  function toggleFiltering() {
    const isEnabled = enableToggle.checked;
    chrome.storage.local.set({ isEnabled }, () => {
      chrome.storage.local.get("allowedSites", (result) => {
        updateStatusIndicator(isEnabled, (result.allowedSites || []).length);
      });
    });
  }

  function removeSite(site) {
    chrome.storage.local.get("allowedSites", (result) => {
      const allowedSites = result.allowedSites || [];
      const updatedSites = allowedSites.filter((s) => s !== site);

      chrome.storage.local.set({ allowedSites: updatedSites }, () => {
        renderSiteList(updatedSites);
        chrome.storage.local.get("isEnabled", (result) => {
          updateStatusIndicator(result.isEnabled || true, updatedSites.length);
        });
      });
    });
  }

  function addSite() {
    let site = newSiteInput.value.trim().toLowerCase();
    if (!site) return;

    if (site.includes("://")) {
      site = site.split("://")[1];
    }
    site = site.split("/")[0];

    chrome.storage.local.get("allowedSites", (result) => {
      const allowedSites = result.allowedSites || [];
      if (allowedSites.includes(site)) {
        alert("This site is already in the allowlist");
        return;
      }

      const updatedSites = [...allowedSites, site];
      chrome.storage.local.set({ allowedSites: updatedSites }, () => {
        newSiteInput.value = "";
        renderSiteList(updatedSites);
        chrome.storage.local.get("isEnabled", (result) => {
          updateStatusIndicator(result.isEnabled || true, updatedSites.length);
        });
      });
    });
  }

  function exportAllowlist() {
    chrome.storage.local.get(["allowedSites", "isEnabled"], (result) => {
      const data = JSON.stringify(result, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "web-allowlist-export.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function importAllowlist(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.allowedSites || !Array.isArray(data.allowedSites)) {
          throw new Error("Invalid format");
        }

        chrome.storage.local.set(
          {
            allowedSites: data.allowedSites,
            isEnabled: data.isEnabled !== undefined ? data.isEnabled : true,
          },
          () => {
            loadSettings();
            alert("Import successful");
          }
        );
      } catch (error) {
        alert("Error importing file: Invalid format");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }
});

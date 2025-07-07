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

  // Event listeners with debounce for rapid changes
  enableToggle.addEventListener("change", debounce(toggleFiltering, 100));
  addSiteButton.addEventListener("click", addSite);
  newSiteInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addSite();
  });
  exportButton.addEventListener("click", exportAllowlist);
  importButton.addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", importAllowlist);

  // Debounce function to prevent rapid updates
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Tab navigation with optimized transitions
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      requestAnimationFrame(() => {
        // Update active tab button
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Show active tab content
        tabContents.forEach((content) => {
          if (content.id === tabId) {
            content.style.display = "block";
            requestAnimationFrame(() => {
              content.classList.add("active");
            });
          } else {
            content.classList.remove("active");
            setTimeout(() => {
              if (!content.classList.contains("active")) {
                content.style.display = "none";
              }
            }, 200); // Match the CSS transition duration
          }
        });
      });
    });
  });

  // Functions
  function loadSettings() {
    chrome.storage.local.get(["allowedSites", "isEnabled"], (result) => {
      const { allowedSites = [], isEnabled = true } = result;

      // Update toggle state
      enableToggle.checked = isEnabled;
      updateStatusIndicator(isEnabled, allowedSites.length);

      // Populate site list
      renderSiteList(allowedSites);
    });
  }

  function updateStatusIndicator(isEnabled, sitesCount) {
    const statusText = document.getElementById("statusText");
    const sitesCountElement = document.querySelector(".sites-count");

    // Use requestAnimationFrame for smooth visual updates
    requestAnimationFrame(() => {
      if (statusText) {
        // Remove old status text
        statusText.style.opacity = "0";

        // Update text after fade out
        setTimeout(() => {
          statusText.textContent = isEnabled ? "ON" : "OFF";
          statusText.style.opacity = "1";
        }, 100);
      }

      if (sitesCountElement) {
        sitesCountElement.textContent = `${sitesCount} site${
          sitesCount !== 1 ? "s" : ""
        } allowed`;
      }
    });
  }

  function renderSiteList(sites) {
    // Create a document fragment to batch DOM updates
    const fragment = document.createDocumentFragment();

    if (sites.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "No sites added yet";
      emptyItem.style.fontStyle = "italic";
      emptyItem.style.color = "#999";
      fragment.appendChild(emptyItem);
    } else {
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
        fragment.appendChild(li);
      });
    }

    // Batch update the DOM
    requestAnimationFrame(() => {
      siteList.innerHTML = "";
      siteList.appendChild(fragment);
    });
  }

  function toggleFiltering() {
    // Prevent multiple rapid toggles
    if (this.isToggling) return;
    this.isToggling = true;

    const isEnabled = enableToggle.checked;

    // Add visual feedback during toggle
    const toggleWrapper = document.querySelector(".toggle-wrapper");
    if (toggleWrapper) {
      toggleWrapper.style.transform = "scale(0.98)";
      setTimeout(() => {
        toggleWrapper.style.transform = "scale(1)";
      }, 100);
    }

    chrome.storage.local.set({ isEnabled }, () => {
      chrome.storage.local.get("allowedSites", (result) => {
        updateStatusIndicator(isEnabled, (result.allowedSites || []).length);
        this.isToggling = false;
      });
    });
  }

  function addSite() {
    let site = newSiteInput.value.trim().toLowerCase();

    // Basic validation
    if (!site) return;

    // Remove protocol and path if present
    if (site.includes("://")) {
      site = site.split("://")[1];
    }

    site = site.split("/")[0]; // Remove any paths

    chrome.storage.local.get("allowedSites", (result) => {
      const allowedSites = result.allowedSites || [];

      // Check if site already exists
      if (allowedSites.includes(site)) {
        alert("This site is already in the allowlist");
        return;
      }

      // Add new site
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

  function exportAllowlist() {
    chrome.storage.local.get(["allowedSites", "isEnabled"], (result) => {
      const data = JSON.stringify(result, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "web-allowlist-export.json";
      a.click();

      setTimeout(() => URL.revokeObjectURL(url), 100);
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
    event.target.value = ""; // Reset file input
  }
});

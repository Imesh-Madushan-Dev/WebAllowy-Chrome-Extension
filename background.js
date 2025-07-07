// Initialize default settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["allowedSites", "isEnabled"], (result) => {
    if (!result.allowedSites) {
      chrome.storage.local.set({
        allowedSites: ["example.com", "google.com"],
        isEnabled: true,
      });
    }
    updateRules();
  });
});

// Function to extract domain from URL
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    console.error("Invalid URL:", url);
    return null;
  }
}

// Function to check if a domain is allowed
function isDomainAllowed(domain, allowedSites) {
  if (!domain) return false;

  return allowedSites.some((site) => {
    // Handle wildcards (e.g., *.example.com)
    if (site.startsWith("*.")) {
      const baseDomain = site.substring(2);
      return domain === baseDomain || domain.endsWith("." + baseDomain);
    }
    return domain === site;
  });
}

// Update declarativeNetRequest rules based on the current allowlist
async function updateRules() {
  try {
    const { allowedSites = [], isEnabled = true } =
      await chrome.storage.local.get(["allowedSites", "isEnabled"]);

    // If filtering is disabled, remove all rules
    if (!isEnabled) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
      });
      return;
    }

    // Create condition patterns for allowed sites
    const allowedPatterns = allowedSites.map((site) => {
      if (site.startsWith("*.")) {
        return `*://*.${site.substring(2)}/*`;
      }
      return `*://${site}/*`;
    });

    // Create the block rule
    const blockRule = {
      id: 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          extensionPath: "/blocked.html",
        },
      },
      condition: {
        urlFilter: "*://*/*",
        resourceTypes: [
          "main_frame",
          "sub_frame",
          "stylesheet",
          "script",
          "image",
          "font",
          "object",
          "xmlhttprequest",
          "ping",
          "csp_report",
          "media",
          "websocket",
          "webtransport",
          "webbundle",
        ],
      },
    };

    // Create the allow rules for each allowed site
    const allowRules = allowedSites.map((site, index) => {
      let pattern;
      if (site.startsWith("*.")) {
        pattern = `*://*.${site.substring(2)}/*`;
      } else {
        pattern = `*://${site}/*`;
      }

      return {
        id: index + 2, // Start IDs from 2
        priority: 2, // Higher priority than block rule
        action: {
          type: "allow",
        },
        condition: {
          urlFilter: pattern,
          resourceTypes: [
            "main_frame",
            "sub_frame",
            "stylesheet",
            "script",
            "image",
            "font",
            "object",
            "xmlhttprequest",
            "ping",
            "csp_report",
            "media",
            "websocket",
            "webtransport",
            "webbundle",
          ],
        },
      };
    });

    // Get existing rule IDs to remove
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map((rule) => rule.id);

    // Update rules
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds,
      addRules: [blockRule, ...allowRules],
    });
  } catch (error) {
    console.error("Error updating rules:", error);
  }
}

// Listen for changes to the allowlist or enabled state
chrome.storage.onChanged.addListener((changes) => {
  if (changes.allowedSites || changes.isEnabled) {
    updateRules();
  }
});

// Listen for messages from popup or blocked page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addToAllowlist" && message.domain) {
    chrome.storage.local.get("allowedSites", (result) => {
      const allowedSites = result.allowedSites || [];

      // Check if site already exists
      if (allowedSites.includes(message.domain)) {
        sendResponse({ success: true, alreadyExists: true });
        return;
      }

      // Add new site
      const updatedSites = [...allowedSites, message.domain];
      chrome.storage.local.set({ allowedSites: updatedSites }, () => {
        updateRules();
        sendResponse({ success: true });
      });
    });
    return true; // Indicates async response
  }
});

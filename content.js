// Only intercept on home and subscriptions, not on watch/search/etc.
function shouldInterceptOnThisPage() {
  const path = window.location.pathname;
  // Home
  if (path === "/") return true;
  // Subscriptions feed
  if (path.startsWith("/feed/subscriptions")) return true;
  return false;
}

// Find the nearest anchor that points to a YouTube watch URL
function findWatchAnchor(target) {
  if (!target) return null;

  const anchor = target.closest("a");
  if (!anchor || !anchor.href) return null;

  let url;
  try {
    url = new URL(anchor.href, window.location.origin);
  } catch {
    return null;
  }

  // Only standard watch URLs with a "v" parameter
  if (
    url.hostname.endsWith("youtube.com") &&
    url.pathname === "/watch" &&
    url.searchParams.has("v")
  ) {
    return { anchor, url };
  }

  return null;
}

// Simple toast
function showToast(text) {
  let toast = document.querySelector("#yt-link-copier-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "yt-link-copier-toast";
    toast.textContent = text;
    document.body.appendChild(toast);
  } else {
    toast.textContent = text;
  }

  toast.classList.add("yt-link-copier-visible");

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("yt-link-copier-visible");
  }, 1500);
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => {
      // fallback
      const tmp = document.createElement("input");
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
    });
  } else {
    const tmp = document.createElement("input");
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
    return Promise.resolve();
  }
}

// Main handler: capture phase so we beat YouTube's own handlers
function handleClick(event) {
  // Only left-click, no modifiers
  if (
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  if (!shouldInterceptOnThisPage()) {
    return; // allow normal behavior on other pages (watch, search, etc.)
  }

  const found = findWatchAnchor(event.target);
  if (!found) return;

  const { url } = found;

  // Strip time-related parameters (&t=..., &start=...)
  url.searchParams.delete("t");
  url.searchParams.delete("start");

  const cleanUrl = url.toString();

  // Block navigation
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  copyToClipboard(cleanUrl).then(() => {
    showToast("Video link copied");
  });
}

// Attach listeners
document.addEventListener("click", handleClick, true);

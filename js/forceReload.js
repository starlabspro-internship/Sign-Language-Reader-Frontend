export function enforceReloadOnBackNavigation() {
  window.addEventListener("pageshow", (event) => {
      if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
          location.reload(); // Reload if accessed through the back button or browser cache
      }
  });
}

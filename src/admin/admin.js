import "./admin.css";
import "../profile/profileManager.js";
import { sidebar } from "./adminFunctions/adminSidebar.js";
import { isAdmin } from "./adminFunctions/checkIfAdmin.js";

(async () => {
  const userIsAdmin = await isAdmin();
})();

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".container");
  if (container) {
    container.insertAdjacentHTML("afterbegin", sidebar);
  }
});

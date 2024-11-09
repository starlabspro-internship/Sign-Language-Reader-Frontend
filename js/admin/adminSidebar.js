const currentPage = window.location.pathname;

export const sidebar = `
  <div class="sidebar">
    <div class="user-info">
      <h2 class="userName"></h2>
      <h3 class="userSurname"></h3>
      <p class="userEmail"></p>
    </div>
    <ul class="profile-nav-options sidebar-nav">
      <li>
        <a href="admin.html" class="${currentPage.includes('admin.html') ? 'active' : ''}">
          <i class="fa-solid fa-user-pen"></i> Profil i adminit
        </a>
      </li>
      <li>
        <a href="users.html" class="${currentPage.includes('users.html') ? 'active' : ''}">
          <i class="fa-solid fa-users-gear"></i> Përdoruesit
        </a>
      </li>
      <li>
        <a href="#" class="${currentPage === '#' ? 'active' : ''}">
          <i class="fa-solid fa-clipboard-question"></i> Pyetje të shpeshta
        </a>
      </li>
      <li>
        <a href="#" id="logoutButton">
          <i class="fa-solid fa-right-from-bracket"></i> Dilni
        </a>
      </li>
    </ul>
    <div id="logoutModal" class="modal" style="display: none">
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Konfirmo daljen</h2>
        <p>Jeni të sigurt që dëshironi të dilni?</p>
        <div class="confirmation-buttons">
          <button id="confirmLogoutButton">Po, dil</button>
          <button id="cancelLogoutButton">Anulo</button>
        </div>
      </div>
    </div>
  </div>
`;

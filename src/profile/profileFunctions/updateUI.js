export function updateUI(user) {
  const defaultMessages = {
      userName: "N/A",
      userSurname: "N/A",
      userEmail: "N/A",
      userPhone: "Not given",
  };

  document.querySelectorAll(".userName").forEach(el => el.textContent = user.userName || defaultMessages.userName);
  document.querySelectorAll(".userSurname").forEach(el => el.textContent = user.userSurname || defaultMessages.userSurname);
  document.querySelectorAll(".userEmail").forEach(el => el.textContent = user.useremail || defaultMessages.userEmail);
  document.querySelectorAll(".userPhone").forEach(el => el.textContent = user.userphonenum || defaultMessages.userPhone);

  document.getElementById("update-userName").value = user.userName || "";
  document.getElementById("update-userSurname").value = user.userSurname || "";
  document.getElementById("update-userEmail").value = user.useremail || "";
  document.getElementById("update-userPhone").value = user.userphonenum || "";
}

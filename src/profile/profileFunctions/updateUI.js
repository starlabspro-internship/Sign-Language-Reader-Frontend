export function updateUI(user) {
  const defaultMessages = {
      notGiven: "Nuk ka të dhëna",
  };

  document.querySelectorAll(".userName").forEach(el => el.textContent = user.userName || defaultMessages.notGiven);
  document.querySelectorAll(".userSurname").forEach(el => el.textContent = user.userSurname || defaultMessages.notGiven);
  document.querySelectorAll(".userEmail").forEach(el => el.textContent = user.useremail || defaultMessages.notGiven);
  document.querySelectorAll(".userPhone").forEach(el => el.textContent = user.userphonenum || defaultMessages.notGiven);
  document.querySelectorAll(".userPicture").forEach(el => el.setAttribute("src", user.userpicture || defaultMessages.notGiven));

  document.getElementById("update-userName").value = user.userName || "";
  document.getElementById("update-userSurname").value = user.userSurname || "";
  document.getElementById("update-userEmail").value = user.useremail || "";
  document.getElementById("update-userPhone").value = user.userphonenum || "";
}

// Function to determine the active base URL
const getBaseURL = () => {
  const isLocalhost = window.location.hostname === "localhost";
  return isLocalhost 
    ? "https://localhost:5000/api" 
    : "https://duarte.devops99.pro/api";
};

// Centralized API URLs
const API_URL = {
  BASE: getBaseURL(),
  USERS: {
    ME: "/users/me",
    GET_BY_ID: (userId) => `/users/${userId}`,
    GET_ALL: "/users",
    LOGIN: "/users/login", 
    GUEST_LOGIN: "/users/guestLogin", 
    SIGNUP: "/users/signup", 
    LOGOUT: "/users/logout",
    CREATE_ADMIN: "/users/createAdmin",
    RESET_PASSWORD_REQUEST: "/users/reset-password",
    RESET_PASSWORD: (token) => `/users/reset-password/${token}`, 
  },
  FAQ: {
    BASE_URL: "/faq"
  },
  SIGNS: {
    BASE_URL: "/signs",
    GET_BY_ID: (signId) => `/signs/${signId}`,
    TRANSLATE: (phrase) => `/signs/translate?phrase=${encodeURIComponent(phrase)}`
  }
};

export default API_URL;

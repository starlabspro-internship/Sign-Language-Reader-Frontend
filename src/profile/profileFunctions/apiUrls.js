// Ky file perdoret per ta shkurtuar punen e url've te API-ve
const API_URL = {
  BASE: "https://localhost:5000/api",
  USERS: {
      ME: "/users/me",
      GET_BY_ID: (userId) => `/users/${userId}`,
      GET_ALL: "/users",
      LOGIN: "/users/login", 
      GUEST_LOGIN: "/users/guestLogin", 
      SIGNUP: "/users/signup", 
      LOGOUT: "/users/logout",
      CREATE_ADMIN: "/users/createAdmin"
  },

};

export default API_URL;

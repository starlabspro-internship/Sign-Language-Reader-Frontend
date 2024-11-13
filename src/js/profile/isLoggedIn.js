import API_URL from './apiUrls.js';

export async function isLoggedIn() {
    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
            method: "GET",
            credentials: "include",
            cache: "no-cache",
        });

        if (!response.ok) {
            console.warn("User is not logged in.");
            return false;
        }

        const data = await response.json();
        return !!data.userId;
    } catch (error) {
        console.error("Error checking login status:", error);
        return false;
    }
}

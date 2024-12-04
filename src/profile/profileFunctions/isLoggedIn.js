import API_URL from './apiUrls.js';

export async function isLoggedIn() {
    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
            method: "GET",
            credentials: "include",
            cache: "no-cache",
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return !!data.userId;
    } catch {
        // Do nothing; just return false
        return false;
    }
}

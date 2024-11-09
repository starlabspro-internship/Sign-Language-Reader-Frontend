import API_URL from './profile/apiUrls.js';
import { isLoggedIn } from './profile/isLoggedIn.js';

export async function handleAuthLinks() {
    const userIsLoggedIn = await isLoggedIn();

    if (userIsLoggedIn) {
        const userId = await getUserId();
        await updateAuthLink(userId);
    } else {
        document.getElementById("authLinks").innerHTML = `
            <a href="auth.html" class="auth-link"><i class="fa-solid fa-right-to-bracket"></i> Kyçu</a>
            <a href="auth.html?signup=true" class="auth-link sign-up"><i class="fa-solid fa-user-plus"></i> Regjistrohu</a>
        `;
        document.getElementById("authLinksMobile").innerHTML = `
            <a href="auth.html" class="auth-link"><i class="fa-solid fa-right-to-bracket"></i> Kyçu</a>
            <a href="auth.html?signup=true" class="auth-link sign-up"><i class="fa-solid fa-user-plus"></i> Regjistrohu</a>
        `;
    }
}

async function getUserId() {
    try {
        const response = await fetch(`${API_URL.BASE}${API_URL.USERS.ME}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const { userId } = await response.json();
            return userId;
        }
    } catch (error) {
        console.error("Error fetching user ID:", error);
    }
    return null;
}

async function updateAuthLink(userId) {
    const userInfoResponse = await fetch(`${API_URL.BASE}${API_URL.USERS.GET_BY_ID(userId)}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (userInfoResponse.ok) {
        const { userName, userIsAdmin } = await userInfoResponse.json();

        // Determine the correct link based on admin status
        const profileLink = userIsAdmin ? 'admin.html' : 'profile.html';

        const authHTML = `<a href="${profileLink}" class="auth-link profile-link">${userName}</a>`;

        document.getElementById("authLinks").innerHTML = authHTML;
        document.getElementById("authLinksMobile").innerHTML = authHTML;
    }
}

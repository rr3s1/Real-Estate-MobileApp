import {
    Client,
    Account,
    OAuthProvider,
    Avatars,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

// Configuration object for the Appwrite client
export const config = {
    platform: "com.aessar.restate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

// Initialize the Appwrite Client
export const client = new Client();
client
    .setEndpoint(config.endpoint!) // Set the API endpoint for the Appwrite server
    .setProject(config.projectId!) // Set the project ID from your Appwrite console
    .setPlatform(config.platform!); // Set the platform to identify the client application

// Initialize Appwrite services
export const avatar = new Avatars(client); // Service to manage user avatars
export const account = new Account(client); // Service to manage user accounts and authentication

/**
 * Handles Google OAuth login flow.
 */
export async function login() {
    try {
        // 1. Create a redirect URI for the OAuth flow
        const redirectUri = Linking.createURL("/");

        // 2. Request an OAuth2 token from Appwrite using the Google provider
        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );
        if (!response) throw new Error("Create OAuth2 token failed");

        // 3. Open a web browser session for the user to authenticate
        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );
        if (browserResult.type !== "success")
            throw new Error("Create OAuth2 token failed");

        // 4. Parse the returned URL to extract the secret and userId
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();
        if (!secret || !userId) throw new Error("Missing 'secret' or 'userId'");

        // 5. Create a new session for the user with the obtained credentials
        const session = await account.createSession(userId, secret);
        if (!session) throw new Error("Failed to create a session");

        return true; // Return true on successful login
    } catch (error) {
        console.error(error);
        return false; // Return false on failure
    }
}

/**
 * Logs the current user out by deleting their session.
 */
export async function logout() {
    try {
        // Delete the current active session
        const result = await account.deleteSession("current");
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Fetches the currently authenticated user's data.
 */
export async function getUser() {
    try {
        // Get the current user account details
        const result = await account.get();
        if (result.$id) {
            // Generate an avatar URL from the user's initials
            const userAvatar = avatar.getInitials(result.name);

            // Return user data including the avatar URL
            return {
                ...result,
                avatar: userAvatar.toString(),
            };
        }

        return null; // Return null if no user is found
    } catch (error) {
        console.log(error);
        return null; // Return null on failure
    }
}
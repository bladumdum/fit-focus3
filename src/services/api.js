// Simple API service stubs.
// Replace these with real network calls when your backend is available.

/**
 * Simulate a login request.
 * Accepts an object: { username, password }
 * Resolves with a user object on success, rejects with an error message on failure.
 */
export async function login({ username, password }) {
	// Simulate network latency
	await new Promise((r) => setTimeout(r, 700));

	// Very small client-side validation; this is only a stub.
	if (!username || !password) {
		return Promise.reject(new Error("Username and password are required"));
	}

	// Example stub behavior: accept any credentials except the literal 'fail'
	if (username === "fail" || password === "fail") {
		return Promise.reject(new Error("Invalid credentials"));
	}

	// Return a fake user object
	return Promise.resolve({
		ok: true,
		user: { id: 1, name: username, email: `${username}@example.com` },
		token: "stub-token-123",
	});
}

export default {
	login,
};

// a reusable API request function

export const apiRequest = async (url, options = {}) => { // option object for method, headers, body
	try {
		const response = await fetch(url, {
            ...options, // method and body options
			headers: {
				"Content-Type": "application/json",
				...options?.headers, // if options.headers are provided, merge them
			},
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(
				errorData.error || `HTTP error! status: ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error(`API request failed for ${url}:`, error);
		throw error;
	}
};

// methods

export const get = (url) => apiRequest(url, { method: "GET" });

export const post = (url, data) =>
	apiRequest(url, {
		method: "POST",
		body: JSON.stringify(data),
	});

export const put = (url, data) =>
	apiRequest(url, {
		method: "PUT",
		body: JSON.stringify(data),
	});

export const del = (url) => apiRequest(url, { method: "DELETE" });

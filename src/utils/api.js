const API = process.env.VUE_APP_API;

export const loginRequest = (user) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            const error = new Error("Login failed");
            error.response = data;
            throw error;
          });
        }
        return response.json();
      })
      .then((result) => resolve(result.data.user_token))
      .catch((error) => {
        reject(error);
      });
  });
};

export const registerRequest = (user) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            const error = new Error("Registration failed");
            error.response = data;
            throw error;
          });
        }
        return response.json();
      })
      .then((result) => resolve(result.data.user_token))
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProducts = () => {
  return fetch(`${API}/products`)
    .then((response) => response.json())
    .then((result) => result.data);
};

export const getCart = (token) => {
  return fetch(`${API}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          const error = new Error("Get cart failed");
          error.response = data;
          throw error;
        });
      }
      return response.json();
    })
    .then((result) => result.data);
};

export const addToCart = (productId, token) => {
  return fetch(`${API}/cart/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          const error = new Error("Add to cart failed");
          error.response = data;
          throw error;
        });
      }
      return response.json();
    })
    .then((result) => result.data);
};

export const removeFromCart = (cartItemId, token) => {
  return fetch(`${API}/cart/${cartItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          const error = new Error("Remove from cart failed");
          error.response = data;
          throw error;
        });
      }
      return response.json();
    })
    .then((result) => result.data);
};

export const placeOrder = (token) => {
  return fetch(`${API}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          const error = new Error("Place order failed");
          error.response = data;
          throw error;
        });
      }
      return response.json();
    })
    .then((result) => result.data);
};

export const getOrders = (token) => {
  return fetch(`${API}/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          const error = new Error("Get orders failed");
          error.response = data;
          throw error;
        });
      }
      return response.json();
    })
    .then((result) => result.data);
};

export const logoutRequest = (token) => {
  return fetch(`${API}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          const error = new Error("Logout failed");
          error.response = data;
          throw error;
        });
      }
      return response.json();
    })
    .then((result) => result.data);
};

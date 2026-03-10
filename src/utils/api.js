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

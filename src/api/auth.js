// services/api.js
class AuthService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, method, body) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include'
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, options);
    if (!response.status == 200) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
    return response.json();
  }

  async login({email, password}) {
    return this.request("/auth/login", "POST", { email, password });
  }

  async signup({name, email, password}) {
    return this.request("/auth/register", "POST", { email, password, name });
  }

  async me(){
    return this.request("/auth/me", "GET");
  }

  async logout() {
    return this.request("/auth/logout", "GET");
  }
}

const authService = new AuthService("https://stockflow-496t.onrender.com/api/v1");
export default authService;

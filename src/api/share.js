class Share {
  constructor(BaseUrl) {
    this.BaseUrl = BaseUrl;
  }

  async request(endpoint, method, body) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(this.BaseUrl + endpoint, options);
    return response.json();
  }

  async getUser({ email }) {
    return this.request(`/auth/getUser/?email=${email}`, "GET");
  }

  async shareCollection(formdata){
    return this.request(`/stock/share`, "POST", formdata); 
  }

  async fetchCollections(formData){
    // return this.request(`/stock?id=${id}`, "GET"); 
    return this.request('/stock/fetchAllCollections', 'POST', formData)
  }
}

const shareService = new Share("https://stockflow-496t.onrender.com/api/v1");
export default shareService;


class StockApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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

    try {
      const response = await fetch(this.baseUrl + endpoint, options);
      return response.json();
    } catch (e) {
      throw new Error(e.message || "Something went wrong");
    }
  }

  async addCollection({ name, desc }) {
    return this.request("/stock/create", "POST", { name, desc });
  }

  async updateCollection({ name, desc, id }) {
    const params = new URLSearchParams({
      name: name,
      desc: desc,
      id: id,
    }).toString();

    return this.request(`/stock/?${params}`, "PUT", { name, desc });
  }

  async deleteCollection({ id }) {
    const params = new URLSearchParams({
      id: id,
    }).toString();

    return this.request(`/stock?${params}`, "DELETE", { id });
  }

  async getCollection({ id }) {
    const params = new URLSearchParams({
      id: id,
    }).toString();

    return this.request(`/stock?${params}`, "GET");
  }

  async getAllCollections() {
    return this.request(`/stock/all`, "GET");
  }

  async searchCollection(query) {
    const params = new URLSearchParams({
      query: query,
    }).toString();
    return this.request(`/stock/collection/search?${params}`, "GET");
  }

  async addStock(formData){
    
    return this.request(`/stock/stock`, "POST", formData )
  }

  async fetchAllStocks(collection){
    return this.request(`/stock/stock/all?collection=${collection}`, "GET")

  }

  async updateStock(formdata){
    const params = new URLSearchParams(formdata).toString();
    return this.request(`/stock/stock?${params}`, "PUT")
  }

  async deleteStock({id}){
    return this.request(`/stock/stock?id=${id}`, "DELETE")
  }
}

const stockApi = new StockApi("https://stockflow-496t.onrender.com/api/v1");
export default stockApi;

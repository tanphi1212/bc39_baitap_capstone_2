function ProductServices() {
    var ProductList = [];
    // Lấy danh sách sản phẩm từ API
    this.getListProductApi = function () {
        return axios({
            url: "https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone",
            method: "GET",
        });
    }
}

export default ProductServices;
function ProductServices() {
    this.ProductList = [];
    // Lấy danh sách sản phẩm từ API
    this.getListProductApi = function () {
        return axios({
            url: "https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone",
            method: "GET",
        });
    }

    this.addProduct = function (product) {
        this.ProductList.push(product);
    };
}

export default ProductServices;
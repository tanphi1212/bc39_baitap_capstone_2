class ProductsService{
    getProductsApi = () => {
        return axios({
            url: "https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone",
            method: "GET"
        });
    };

    addProductApi = (product) => {
        return axios({
            url: 'https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone',
            method: "POST",
            data: product,
        });
    };

    getProductByIdApi = (id) => {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone/${id}`,
            method: "GET"
        })
    }

    updateProductByIdApi = (product) => {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone/${user.id}`,
            method: "PUT",
            data: product,
        })
    }

    deleteProductApi = function (id) {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/ProductCapstone/${id}`,
            method: "DELETE"
        })
    }
}
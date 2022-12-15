import ProductServices from "../services/productServices.js";
import Products from "../module/Product.js";

var product = new Products();
var productServices = new ProductServices();

function getEle(id) {
    return document.getElementById(id);
}


// Hiện danh sách Product
function getListPro() {
    productServices.getListProductApi()
        .then(function (result) {
            renderHTML(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
getListPro();

function renderHTML(data) {
    var content = "";

    // Cách 1:
    data.forEach(function (product) {
        // console.log(product);
        productServices.addProduct(product);
    });
    for (var i = 0; i < data.length; i++) {
        var pro = data[i];
        content += `
       <div class="col-3 mt-3">
            <div class="card" style="width:100%; height:100%">
                <div class="card-header">
                    <img class="card-img-top"
                        src="${pro.img}" alt="">
                        <span class="badge badge-danger">${pro.price}$</span>
                </div>
                <div class="card-body">
                    <h4 class="card-title">${pro.name}</h4>
                    <p class="card-text">${pro.desc}</p>
                </div>
                <div class="card-footer d-flex justify-content-center">
                    <button class="btn btn-success" onclick="addToCart(${pro.id})">Add to Cart </button>
                </div>
            </div>
        </div>
            `
    }
    // Cách 2:
    // data.forEach(function (product) {
    //     console.log(product);
    //     productServices.addProduct(product);

    //     content += `
    //     <div class="col-3 mt-3">
    //         <div class="card" style="width:100%; height:100%">
    //             <div class="card-header">
    //                 <img class="card-img-top"
    //                     src="${product.img}" alt="">
    //                     <span class="badge badge-danger">${product.price}$</span>
    //             </div>
    //             <div class="card-body">
    //                 <h4 class="card-title">${product.name}</h4>
    //                 <p class="card-text">${product.desc}</p>
    //             </div>
    //             <div class="card-footer d-flex justify-content-center">
    //                 <button class="btn btn-success" onclick="addToCart()">Add to Cart </button>
    //             </div>
    //         </div>
    //     </div>
    //     `;
    // });
    console.log(productServices.ProductList);

    getEle("listProduct").innerHTML = content;
}

function addToCart(id) {
    console.log(id);
}
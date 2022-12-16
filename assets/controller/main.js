let productsService = new ProductsService();
let cart = new Cart();

console.log(cart)
const getELe = (id) => document.getElementById(id);
window.getELe = getELe;



function setLocalStorage() {
    //Convert JSON => string
    var dataString = JSON.stringify(cart.cartItem);
    //lưu data xuống LocalStorage
    localStorage.setItem("CART", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("CART")) {
        var dataString = localStorage.getItem("CART");
        //Convert string => JSON
        cart.cartItem = JSON.parse(dataString);
        renderCart(cart.cartItem)
    }
}

// hàm render danh sách
const renderHTML = (data) => {
    let content = "";
    data.forEach(product => {
        content += `
            <div class="col-3 mt-3">
                <div class="card" style="height: 100%;">
                    <div class="card-header">
                        <img class="card-img-top"
                        src=${product.img} alt="">
                    <span class="badge badge-danger">${product.price}$</span>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${product.name}</h4>
                        <p class="card-text">${product.desc}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <button  class="btn btn-success" onclick="addItem(${product.id})">Add to Cart </button>
                    </div>
                </div>
            </div>
        `
    });

    getELe('productsList').innerHTML = content
}
// lấy dữ liệu danh sách
const getProductsList = () => {
    productsService.getProductsApi()
        .then((results) => {
            console.log(results)
            renderHTML(results.data)
        })
        .catch((err) => {
            console.log(err)
        })
}
getProductsList();
// lọc danh sách
getELe('filterProduct').addEventListener("change", () => {
    const option = getELe("filterProduct").value.toLowerCase();
    console.log(option);
    productsService
        .getProductsApi()
        .then((result) => {
            const data = result.data;
            let listFilter = data;

            if (option !== "tất cả") {
                if (option !== "0") { listFilter = data.filter((product) => product.type.toLowerCase() === option); }
            }


            renderHTML(listFilter);
        })
        .catch((error) => {
            console.log(error);
        });
});

/**
 * 
 *Cart
 */

const renderCart = (data) => {
    let content = '';
    if (data.length > 0) {
        data.forEach((item) => {
            content += `
            <tr class="text-center">
                <td class="align-middle">${item.product.name}</td>
                <td class="d-flex">
                    <button class="btn btn-info" onclick="editQtyItem(${item.product.id},false)"><i class="fa-solid fa-chevron-left" ></i></button>
                    <p class="align-items-center m-auto"> ${item.quantity}</p>
                    <button class="btn btn-info" onclick="editQtyItem(${item.product.id},true)"><i class="fa-solid fa-chevron-right" ></i></button>
                </td>
                <td class="align-middle">${item.product.price} $</td>
                <td><button class="btn btn-danger" onclick="deleteCart(${item.product.id})">Delele</button></td>
            </tr>
            `
        })
    }else{
        content += '<p class="text-center"> Không có gì trong giỏ hàng <p>'
    }
    getELe('cartTable').innerHTML = content;
    getELe('totalCart').innerHTML = cart.totalCart();
}
window.renderCart = renderCart;

const addItem = (id) => {
    productsService.getProductByIdApi(id)
        .then((result) => {
            let item = result.data;
            if (cart.checkIsHave(item.id)) {
                cart.addCart(result.data);
            } else {
                const index = cart.findIndex(item.id)
                let qty = cart.cartItem[index].quantity * 1;
                cart.editQtyItem(item.id, qty + 1);

            }
            alert("đã thêm vào giỏ hàng")
            setLocalStorage()
        })
        .catch((err) => {
            console.log(err)
        })
}
window.addItem = addItem;




getELe('cartIcon').addEventListener("click", () => {
    getLocalStorage()
})
// xóa hết cart
const clearCart = () => {
    cart.cartItem = [];
    alert("Đã xóa giỏ hàng")
    setLocalStorage();
    getLocalStorage();
}
window.clearCart = clearCart;

// Xóa item Cart
const deleteCart = (id) => {
    cart.deleteCart(id);
    setLocalStorage();
    getLocalStorage();
}
window.deleteCart = deleteCart;


//Đặt hàng

const purchaseCart = () => {
    if (cart.cartItem.length > 0) {
        cart.cartItem = [];
        alert("Đã đặt hàng")
        setLocalStorage();
        document.getElementsByClassName('close')[0].click();
        return
    }
    alert("không có sản phẩm trong giỏ hàng")
    
}
window.purchaseCart = purchaseCart;

// Cộng trừ số lượng 
const editQtyItem = (id, isPlus) => {
    let item = cart.getInfoItem(id);
    let qty = item.quantity;
    if (!isPlus) {
        if (qty > 1)
            cart.editQtyItem(id, qty - 1);
    } else {
        cart.editQtyItem(id, qty + 1)
    }

    setLocalStorage();
    getLocalStorage();
}

window.editQtyItem = editQtyItem;

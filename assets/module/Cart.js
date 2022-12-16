function Cart(){
    this.cartItem= []
    this.addCart = (product) => {
        this.cartItem.push({product, quantity : 1})
    }
    this.deleteCart = (id) => {
        const index = this.findIndex(id)
        if(index !== -1)
        {
            this.cartItem.splice(index, 1);
        }
    }
    this.editQtyItem = (id, qty) =>{
        const index = this.findIndex(id);
        if(index !== -1){
            this.cartItem[index].quantity = qty;
        }
    }
    this.getInfoItem = (id) => {
        const index = this.findIndex(id);
        return this.cartItem[index];
    }

    this.findIndex = function (id) {
        let index = -1;
        for (let i = 0; i < this.cartItem.length; i++) {
            let item = this.cartItem[i];
            if (item.product.id == id) {
                index = i;
                break
            }
        }
        return index;
    }

    this.checkIsHave = (id) => {
        let index = this.findIndex(id)
        if(index != -1){
            return false;
        }
        return true;
    }
    this.totalCart = ()=>{
        let total = 0;
        this.cartItem.forEach(item=> {
            total += item.product.price*item.quantity;
            console.log(total);
        })
        return total;
    }
}
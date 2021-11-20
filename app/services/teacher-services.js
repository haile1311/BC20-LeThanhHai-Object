function ProductService(){
    this.getListProductApi = function(){
        return axios({
            url: "https://6188d850d0821900178d756d.mockapi.io/demoQLGV",
            method: "GET"
        });
    };

    ProductService.prototype.deleteProductApi= function(id){
     return axios({
        url: `https://6188d850d0821900178d756d.mockapi.io/demoQLGV/${id}` ,
        method: "DELETE",
    });
};

    this.addProductApi = function(product){
        return axios({
            url:"https://6188d850d0821900178d756d.mockapi.io/demoQLGV",
            method: "POST",
            data: product,
        })
    }

    this.getProductbyID = function(id){
         return axios({
            url: `https://6188d850d0821900178d756d.mockapi.io/demoQLGV/${id}` ,
            method: "GET",
         })
    }

    this.updateProductApi = function(product){
        return axios({
            url: `https://6188d850d0821900178d756d.mockapi.io/demoQLGV/${product.id}`,
            method: "PUT",
            data: product,
         })
        }
}

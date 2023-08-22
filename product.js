class ProductManager{
    constructor (){
        this.products = []
    };
    getProducts(){
        console.log(this.products);
    }

    addProduct (title,description,price,thumbnail,code,stock){
        if(!title || !description || !price || !thumbnail || !code || !stock ){
            console.log("Se necesita ingresar datos validos")
        }else{
            const prodCode = this.products.find((e)=>e.code===code);
            
            if(prodCode){
                console.log("Code ya existe, vuelva a ingresar un dato correcto")

            }else{
                let newId;
                if(this.products.length == 0){
                    newId = 1
                }else{
                    newId = this.products[this.products.length -1].id + 1
                }
                
                const newProduct = {
                    id: newId,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                
                this.products.push(newProduct);

                };

            }
        };
    getProductsById(id){
        const prodId = this.products.find(e=>e.id===id);
        
        if(!prodId){
            console.log("Not Found");
        }else{
            console.log(prodId);
        }

    };

};
const manager = new ProductManager();
console.log(manager);
manager.addProduct("top", "top deportivo",4000, "no  posee", "779001",50);
manager.addProduct("calza","calza deportiva", 8000, "no posee", "779002", 50);
manager.addProduct("short","short deportivo", 6000, "no posee", "779005", 50);
manager.addProduct("calza corta","calza deportiva", 5000, "no posee", "779003", 50);
manager.getProducts();
manager.getProductsById(3);



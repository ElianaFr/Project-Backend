const fs = require ("fs");

class ProductManager{
    constructor (filePath){
        this.filePath = filePath;
        this.lastProductId = 0;
    }

    fileExist(){
        return fs.existsSync(this.filePath);
        
    }

    async getProducts(){
        try {
            if(this.fileExist()){
                // lee el archivo
                const content = await fs.promises.readFile(this.filePath,"utf8");
                // paso de string a Json
                const contentJson = JSON.parse(content);
                return contentJson;

            }else{
                throw new Error ("No es posible leer el archivo");
            }

            
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }



    async addProduct (productInfo){
        
        try {
            const {title,description,price,thumbnail,code,stock} = productInfo;

            // valido si el archivo existe
            if(this.fileExist()){

                // lee el archivo
                const content = await fs.promises.readFile(this.filePath,"utf8");
                // paso de string a Json
                const contentJson = JSON.parse(content);
                                
                // validar que se ingrese toda la info

                if (!productInfo.title || !productInfo.description || !productInfo.price ||!productInfo.thumbnail 
                    ||!productInfo.code || !productInfo.stock){
                    console.log("Se necesita ingresar datos validos");

                }else{
                    // validar que el codigo no se repita
                    const prodCode = contentJson.find((e)=>e.code===productInfo.code)
                    if(prodCode){
                        console.log("Code ya existe, vuelva a ingresar un dato correcto")

                    }else{

                        const newProduct={
                                title,description,price,thumbnail,code,stock,id:this.lastProductId,
                            }
                
                        contentJson.push(newProduct);
                        // this.lastProductId ++;

                        // sobreescribir el archivo con el nuevo producto
                        await fs.promises.writeFile(this.filePath,JSON.stringify(contentJson,null,"\t"));
                                            
                        console.log("Producto agregado.");
                    };
                    
                };
                
            }else{
                throw new Error ("No es posible guardar el producto");
            };
            
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async getProductById(id){   
        try {
            if(this.fileExist()){
                // lee el archivo
                const content = await fs.promises.readFile(this.filePath,"utf8");
                // paso de string a Json
                const contentJson = JSON.parse(content);

                const prodId = contentJson.find(e=>e.id === id);
                if(!prodId){
                    console.log("Producto no encontrado");
                }else{
                    return(prodId)
                }
            }
            
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };
    async deleteProduct(id){
        try {
            if(this.fileExist()){
                // lee el archivo
                const content = await fs.promises.readFile(this.filePath,"utf8");
                // paso de string a Json
                const contentJson = JSON.parse(content);

                const listProd = contentJson.filter(e=>e.id !== id);

                // sobreescribir el archivo con el nuevo producto
                await fs.promises.writeFile(this.filePath,JSON.stringify(listProd,null,"\t"));
                console.log("Producto borrado");
                
            }else{
                console.log("Ingrese un ID valido");
            }

        }catch (error) {
            console.log(error.message);
            throw error;
        };
    };
    async updateProduct(id,product){
        try {
            if(this.fileExist()){
                // lee el archivo
                const content = await fs.promises.readFile(this.filePath,"utf8");
                // paso de string a Json
                const contentJson = JSON.parse(content);
                const prodUpdate = contentJson.find(e=>e.id === id);
                

            } 
        }catch (error) {
            console.log(error.message);
            throw error;
        }
    }
};

const income = async()=>{
    try {
        const manager = new ProductManager("./fileProduct.json");
        // const productLoaded = await manager.getProducts();
        // console.log(productLoaded);
        
        // await manager.addProduct({title:"calza deportiva",description:"Calza deportiva mujer",price:8000, thumbnail:"No posee",code:"77901",stock:50});
        // await manager.addProduct({title:"short deportivo",description:"short deportivo mujer",price:6000, thumbnail:"No posee",code:"77902",stock:50});
        // await manager.addProduct({title:"camiseta deportiva",description:"camiseta mujer",price:4000, thumbnail:"No posee",code:"77903",stock:50});
        
        // const productId = await manager.getProductById(2);
        
        // const productDeleted= await manager.deleteProduct(0);
        
        // const productLoaded = await manager.getProducts();
        // console.log(productLoaded);
        
    
    } catch (error) {
        console.log(error.message);
    }
};
income();
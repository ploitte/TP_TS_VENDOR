export class ApiService{

    private static instance: ApiService = null;
    private url:string = "http://localhost/tsDragVendeur/Serveur/api/";

    static getService():ApiService{
        if( !ApiService.instance){
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private constructor(){}

    getConnexion(username:string, password:string) :Promise<{ id: number, username:string, password:string, email:string }>{
        return new Promise((resolve, reject) =>{
            $.ajax({
                url : this.url + "connexion",   
                method : "post",
                dataType : "json",
                data : {
                    username : username,
                    password : password
                },
                success : (connex : { id: number, username:string, password:string, email:string }) => {
                    resolve(connex);
                },
                error : (error) => {
                    reject(error);
                }
            });
        });
    }

    getInscription(username:string, email:string, password:string, verifPass:string) :Promise<{ status: string, error: string[] }>{
        return new Promise((resolve, reject) => {
            $.ajax({
                url : this.url + "inscription",
                method : "post",
                dataType : "json",
                data : {
                    username : username,
                    email : email,
                    password : password,
                    verifPass : verifPass
                },
                success : (inscription: { status: string, error: string[] }) => {
                    resolve(inscription);
                 },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }
    
    getVendeur( idvendeur:number ): Promise< { vendeur: any, produitVendeur: any, catVendeur: any } > {
 
        return new Promise((resolve, reject) => {
            $.ajax({
                url : this.url + "vendeur/" + idvendeur,
                dataType: "json",
                success : (vendeur: { vendeur: any, produitVendeur: any, catVendeur: any }) => {
                    resolve(vendeur);
                },
                error : (error) => {
                    reject(error);
                }
            });
        });
    }

    getCategorie() :Promise <{id:number, name:string}>{
        return new Promise((resolve, reject) =>{
            $.ajax({
                url : this.url + "categorie",
                method : "get",
                dataType : "json",
                success : (cat: {id:number, name:string}) =>{
                    resolve(cat);
                },
                error : (error) => {
                    reject(error);
                }
            });
        });
    }   
}
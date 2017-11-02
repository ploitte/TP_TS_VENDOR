import { Vendeur } from './Vendeur';
import { Produit } from "./Produit";
import { Categorie } from "./Categorie";
import { Model } from "./Model";
import { ApiService } from "./ApiService";

export class App {
    public stopLock:boolean = false;
    public stopLockProd:boolean = false;
    public stopLockDesc:boolean = false;
    public stopLockCo:boolean = false;
    public mooveBody:number = 0;
    public currentVendeur:Vendeur = null;
    public currentCat:Categorie[] = [];
    public currentProduit:Produit[] = [];
    public flagAnim:boolean = false;
    public idVendeur: number = 0;
    public nameVendeur: JQuery;
    public item: JQuery;
    public header:JQuery;
    public king:JQuery;

    constructor(){
        this.king = $("#theKING");
        this.nameVendeur = $("#vendeur");
        this.item = $(".item");
        this.header = $("header");
    }

    //TEST CONSOLE//
    testLog(){
        // console.log(this.currentProduit);
    }
    //_____________


    stopPropa(callback:Function){
        let that:any = this;
        if(this.stopLock == false){
            callback();
            this.stopLock = true;
            setTimeout(function(){
                that.stopLock = false;
            },1000);
        }else{
            return;
        }
    }

    stopPropaProd(id:number){
        let that:any = this;
        if(this.stopLockProd == false){
            for(let a of this.currentProduit){
            if(id == a["catId"]){
                a.display($("#prodMain"));
            }
        }
            this.stopLockProd = true;
            setTimeout(function(){
                that.stopLockProd = false;
            },600);
        }else{
            return;
        }
    }

    stopPropaDesc(id:string){
        let that:any = this;
        if(this.stopLockDesc == false){
            for(let a of this.currentProduit){
            if(id == a["name"]){
                a.displayDesc($("#detailMain"));
                console.log(a);
            }
        }
            this.stopLockDesc = true;
            setTimeout(function(){
                that.stopLockDesc = false;
            },600);
        }else{
            return;
        }
    }

    stopPropaCo(name:string, password:string){
        let that:any = this;
        if(this.stopLockCo == false){
            this.getConnexion(name, password);
            this.stopLockCo = true;
            setTimeout(function(){
                that.stopLockCo = false;
            },1000);
        }else{
            return;
        }       
    }

    resetDom(){
        $(":text, :password").val("");
        for(let a of this.currentCat){
            a.$dom.remove();
        }
        for(let a of this.currentCat){
            a.$dom.remove();
        } 
        this.currentCat = [];
        this.currentProduit = [];
        this.currentVendeur = null;   
       
    }

    resetPos(){
        this.mooveBody = 0;
        this.king.css("right", this.mooveBody+"%");
    }

    up(){
        this.mooveBody += 100;
        this.king.css("right", this.mooveBody+"%");
    }

    down(){
        this.mooveBody -= 100;
        this.king.css("right", this.mooveBody+"%");
    }

    getSuccess(data:any){
        $("#error").html("");
        $("#co").removeClass("removeError");
        if(data.error == "good"){
            this.up();
            $("#connected").append("<h3 id='successCo'> Welcome " + data.success["name"] + "</h3>");    
            setTimeout(function(){
                $("#connected").css("top", "5%");
            }, 500)
            setTimeout(function(){
                $("#connected").css("opacity", "0");
            }, 3500)
            this.getVendeur(data.success["id"]);
        }
    }

    getError(data:any){
        let div:string = "";   
        for(let a in data.error){
            div += "<h3 class='spanError'>-  " + data.error[a] + "</h3>";
        }
        $("#error").css("display", "block");
        $("#co").addClass("removeError");
        $("#error").html(div);
    }

    getConnexion(name:string, password:string):void{

        let api:ApiService = ApiService.getService(); 
        let connec:Promise<any> = api.getConnexion(name, password);

        connec.then(( data ) => {
            if(data.error == "good"){
                this.getSuccess(data);
            }
            else{
                this.getError(data);
            }
        })
        .catch((error) =>{
            (error);
        });
    }

    getVendeur($id:number):void{

        let api:ApiService = ApiService.getService(); 
        let vend:Promise<any> = api.getVendeur($id);    

        vend.then((data) => {
            for(let a of data.catVendeur){
                let newCat:Categorie = new Categorie(a["id"], a["name"]);
                this.currentCat.push(newCat);
                newCat.display($("#catMain"));
                if(this.currentCat.length == 3){
                    $(".catCont").css("height", "33%");
                }
                if(this.currentCat.length == 2){
                    $(".catCont").css("height", "50%");
                }
                if(this.currentCat.length == 1){ 
                    $(".catCont").css("height", "60%");               
                }              
            }
            for(let b of data.produitVendeur){
                let newProd:Produit = new Produit(b["id"], b["name"], b["id_cat"], b["details"]);
                this.currentProduit.push(newProd);
            }
                let newVendor:Vendeur = new Vendeur(
                    data.vendeur["id"],
                    data.vendeur["name"],
                    this.currentProduit
                );
                this.testLog();
                this.currentVendeur = newVendor;
        })           
        .catch((error)=>{
            (error);
        })

    }

    removeHtml(where:string){
        let test:JQuery = $("#" + where).parent();
        test.children().html("");
    }

    



}
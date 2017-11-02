import { Produit } from "./Produit";
import { Model } from "./Model";

export class Vendeur extends Model{
    public name:string;
    public produits:Produit[];


    constructor(id:number, name:string, produits:Produit[]){
        super(id);
        this.name = name;
        this.produits = produits;
    }   

    display(where:JQuery){
        let name:string = this.name;
        let id:string = "vendeur" + this.id;

        let div:string = "<div class='vendeurVignette' id='"+ id +"' data-id='"+ this.id +"'>" + name + "</div>";

        this.$dom = $(div);
        where.prepend(this.$dom);
    }


  
}
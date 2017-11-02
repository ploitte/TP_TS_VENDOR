import { Categorie } from "./Categorie";
import { Model } from "./Model";

export class Produit extends Model{

    public name:string;
    public catId:number;
    public desc:string;
    public $domDesc:JQuery;
    public test:string;

    constructor(id:number, name:string, catId:number, desc:string){
        super(id);
        this.name = name;
        this.catId = catId;
        this.desc = desc;
    }

    display(where:JQuery){       
        let div:string = "<div id='"+ this.name +"' class='item'></div>";
        this.$dom = $(div);
        where.append(this.$dom);
    }

    displayDesc(where:JQuery){
        let div:string = "<div id='haut'>"
        div += "<div id='"+ this.name +"' class='descItem'></div>";
        div += "<div class='prodName'>" + this.name + "</div>";
        div += "</div>"
        div += "<div id='bas'>";
        div += "<div id='basTxt'>" + this.desc + "</div>";
        div += "</div>"

        // this.$domDesc = $(div);
        this.test = div;
        where.html(this.test);
    }

}
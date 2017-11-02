import { Model } from "./Model";

export class Categorie extends Model {

    public $dom: JQuery<HTMLElement>;
    public name:string;

    constructor(id:number, name:string){
        super(id);
        this.name = name; 
    }

    display(where:JQuery){
        let div:string = "<div class='catCont' id='" + this.name + "' data-id='"+ this.id +"'>"+ this.name + "</div>";

        this.$dom = $(div);
        where.append(this.$dom);
    }

}
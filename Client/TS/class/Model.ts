export abstract class Model{

    public id:number;
    public $dom: JQuery;

    constructor(id:number){
        this.id = id;
    }

    getId():number{
        return this.id;
    }

    abstract display(where:JQuery):void;

}
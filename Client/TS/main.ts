import { App } from "./class/App";
import { Vendeur } from "./class/Vendeur";

var app: App = new App();

$(document).click(function(){
    //TEST
})

$(document).on("click", "#exit", function(){
    app.resetPos();
    setTimeout(function() {
        app.resetDom(); 
    }, 600);    
})

$(document).on("click", ".back", function(){
    let where:string = $(this).attr("id");
    app.down();
    setTimeout(function(){
        app.removeHtml(where);
    }, 300);
    
})

$("#subReg").click(function(event){
    event.preventDefault();
    $("#warning, #alertMessage").css("display", "block");
})

$(document).on("click", "#subCo", function(event){
    event.preventDefault();
    let name:string = $("#usernameCo").val() as string;
    let password:string = $("#passCo").val() as string;
    app.stopPropaCo(name, password);
})

$(document).on("click", ".catCont", function(){
    app.stopPropa($.proxy(app.up, app));

    let data:number = $(this).data("id");
    app.stopPropaProd(data);
})

$(document).on("click", ".item", function(){
    app.up();
    let id:string = $(this).attr("id");
    app.stopPropaDesc(id);
})


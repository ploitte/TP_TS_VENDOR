//Permet d'afficher les error en cas de faute de frappe dans le $("...");

function Dom(selector: string) :JQuery{
    let elementJquery:JQuery = $(selector);
    if(elementJquery.length < 1){
        throw new Error("L'élelement " + selector + "n'existe pas dans votre html !");
    }

    return elementJquery;
}
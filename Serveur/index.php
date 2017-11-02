<?php 
//Autorise certains sites (ici tous) à faire des requêtes cross domain
header("Access-Control-Allow-Origin: *"); 

require "flight/Flight.php"; 
require "autoload.php";


Flight::route("POST /api/connexion", function(){
    $post = $_POST;
    $bdd = new bddManager();
    $vendeur = new Vendeur();
    $service = new ServiceCo();
    $service -> setParams($post);

    if($service -> controls() === true ){
        $vendeur -> setName($post["username"]);
        $vendeur -> setPassword($post["password"]);
        $success = $vendeur -> getVendeurByName($bdd);
        $error = "good";
    }else{
        $error = $service -> getError();
        $success = "bad";
    }

    $status = [
        "success" => $success,
        "error" => $error
    ];

    echo json_encode($status);
});

Flight::route("GET /api/categorie", function(){
    $bdd = new bddManager();
    $categorie = $bdd -> getAllCat();

    echo json_encode($categorie);   
});

Flight::route("GET /api/vendeur/@id", function($id){
    
    $bdd = new bddManager();
    $vendeur = $bdd -> getVendeurById($id);
    $produit = $bdd -> getProdByVend($id);
    $catVend = $bdd -> getCatByVendor($id);
    $status = [
        "vendeur" => $vendeur,
        "produitVendeur" => $produit,
        "catVendeur" => $catVend
    ];  

    echo json_encode($status);
});


Flight::start();
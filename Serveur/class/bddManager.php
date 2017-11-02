<?php

class bddManager{

    private $connexion;

    public function __construct(){
        $this -> getConnexion();
    }

    public function getConnexion(){
        if(empty($this -> connexion)){
                $this -> connexion = new PDO("mysql:host=localhost;dbname=vendeurdrag;charset=UTF8", "root", "root");
                $this->connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->connexion->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);     
        }
    }

    public function getAll($where){
        $pdo = $this -> connexion -> query("SELECT * FROM $where"); 
        return $pdo -> fetchAll(PDO::FETCH_ASSOC);      
    }

    public function getAllCat(){
        return $this -> getAll("categorie");
    }

    public function getAllProduit(){
        return $this -> getAll("produit");
    }

    public function getAllVendeur(){
        return $this -> getAll("vendeur");
    }

    public function getVendeurByName(Vendeur $vendeur){
        $pdo = $this -> connexion -> prepare("SELECT * FROM vendeur WHERE name=:name");
        $pdo -> execute(array(
            "name" => $vendeur -> getName() 
        ));
        return $pdo -> fetch(PDO::FETCH_ASSOC);
    }

    public function getVendeurById($id){
        $pdo = $this -> connexion -> prepare("SELECT * FROM vendeur WHERE id=:id");
        $pdo -> execute(array(
            "id" => $id
        ));
        return $pdo -> fetch(PDO::FETCH_ASSOC);
    }   

    public function getProdByVend($id){
        $query = "SELECT produit.* FROM produit JOIN vendeur_produit ON vendeur_produit.id_vendeur = ? WHERE produit.id = vendeur_produit.id_produit";

        $pdo = $this -> connexion -> prepare($query);
        $pdo -> execute(array($id));

        return $pdo -> fetchAll(PDO::FETCH_ASSOC);
    }

    public function checkMailExist(Vendeur $vendeur){
        $pdo = $this -> connexion -> prepare("SELECT email FROM vendeur WHERE email=:email");
        $pdo -> execute(array(
            "email" => $vendeur -> getEmail()
        ));
        return $pdo -> rowCount();
    }

    public function checkVendeurExist(Vendeur $vendeur){
        $pdo = $this -> connexion -> prepare("SELECT name FROM vendeur WHERE name = ?");
        $pdo -> execute(array($vendeur -> getName()));
        return $pdo -> rowCount();
    }

    public function checkUserPass(Vendeur $vendeur){
        $pdo = $this -> connexion -> prepare("SELECT name FROM vendeur WHERE name=:name AND password=:password");
        $pdo -> execute(array(
            "name" => $vendeur -> getName(),
            "password" => $vendeur -> getPassword()
        ));
        return $pdo -> rowCount();    
    }

    public function getCatByVendor($id){
        $pdo = $this -> connexion -> prepare("SELECT DISTINCT c.* FROM vendeur_produit vp, categorie c, produit p WHERE vp.id_produit = p.id AND vp.id_vendeur = ? AND p.id_cat = c.id");
        $pdo -> execute(array($id));
        return $pdo -> fetchAll(PDO::FETCH_ASSOC);
    }


}
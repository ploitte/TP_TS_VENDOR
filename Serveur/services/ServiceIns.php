<?php


class ServiceIns extends Service{

    public function controls(){
            $bdd = new bddManager();
            $vendeur = new Vendeur();

            $Vendeur -> setName($this -> params["username"]);
            $vendeur -> setPassword($this -> params["password"]);
            $vendeur -> setEmail($this -> params["email"]);

            if($vendeur -> checkVendeurExist($bdd) == 1){
                $this -> saveError("vendeurExist", "USername déjà utilisé");
            }

            if($vendeur -> checkMailExist($bdd) == 1){
                $this -> saveError("emailExist", "Email déjà utilisé"); 
            }

            if(empty($this -> params["username"])){
                $this -> saveError("emptyUsername", "Username non renseigné");
            }
            else if(strlen($this -> params["username"]) < 4){
                $this -> saveError("lengthUsername", "Username trop court");
            }

            if(empty($this -> params["email"])){
                $this -> saveError("emptyEmail", "Email non renseigné");
            }
            else if (!preg_match('#^[\w.-]+@[\w.-]+\.[a-z]{2,6}$#i', $this -> params["email"])){
                $this -> saveError("validMail", "Adresse mail non valide");
            }

            if(empty($this -> params['password'])){
                $this -> saveError("emptyPassword", "Mot de passe manquant");
            }
            else if(strlen($this -> params["password"]) < 8){
                $this -> saveError("passwordLength", "Mot de passe trop court");
            }

            if(empty($tihs -> params['verifPass'])){
                $this -> saveError("emptyVerifPass", "Mot de passe de verification manquant");
            }
            else if($this -> params["password"] != $this -> params["verifPass"]){
                $this -> saveError("matchPass", "Les mots de passe ne correspondent pas");
            }

            if(empty($this -> error)){
                return true;
            } else{
                return $this -> error;
            }
    }

}
<?php

class ServiceCo extends Service{

    
    public function controls(){

        $bdd = new bddManager();

        if(empty($this -> params["username"])){
            $this -> saveError("emptyUsername", "Username manquant");
        }
        if(empty($this -> params["password"])){
            $this -> saveError("emptyPass", "Password manquant");
        }

        if( empty($this -> error) ){

            $vendeur = new Vendeur();
            $vendeur -> setName($this -> params["username"]);
            $vendeur -> setPassword($this -> params["password"]);
            if($vendeur -> checkUserPass($bdd) == 0){
                $this -> saveError("userPass", "Username ou password incorrect");
            }
        }

        if(!empty($this -> error)){
            return $this -> error;
        }else{
            return true;
        }       
    }


}
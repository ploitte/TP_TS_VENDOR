<?php

class Produit extends Model{

    private $id_cat;



    public function setIdCat($id_cat){
        $this -> id_cat = $id_cat;
    }

    public function getIdCat(){
        return $this -> id_cat;
    }

        function jsonSerialize(){
        return [
            "id" => $this->id,
            "name" => $this->name ,
            "id_cat" => $this->id_cat
        ];
    }

}
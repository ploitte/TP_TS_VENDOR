<?php

class Categorie extends Model implements JsonSerializable{


    
    function jsonSerialize(){
        return [
            "id" => $this->id,
            "name" => $this->name
        ];
    }

}
<?php


class Vendeur extends Model{

    private $password;
    private $email;

	public function getPassword(){
		return $this->password;
	}

	public function setPassword($password){
		$this->password = $password;
	}

	public function getEmail(){
		return $this->email;
	}

	public function setEmail($email){
		$this->email = $email;
	}

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "name" => $this->name ,
            "password" => $this->password,
            "email" => $this ->email
        ];
    }

	public function getVendeurByName(bddManager $bdd){
		return $bdd -> getVendeurByName($this);
	}


	public function checkMailExist(bddManager $bdd){
		return $bdd -> checkMailExist($this);
	}

	public function checkVendeurExist(bddManager $bdd){
		return $bdd -> checkVendeurExist($this);
	}

	public function checkUserPass(bddManager $bdd){
		return $bdd -> checkUserPass($this);
	}	

}

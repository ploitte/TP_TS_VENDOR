<?php


abstract class Service{

    protected $error;
    protected $params;

	public function getError(){
		return $this->error;
	}

	public function setError($error){
		$this->error = $error;
	}

	public function getParams(){
		return $this->params;
	}

	public function setParams($params){
		$this->params = $params;
	}

    public function saveError($name, $error){
        $this -> error[$name] = $error;
    }

}
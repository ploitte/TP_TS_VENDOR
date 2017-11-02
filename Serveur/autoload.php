<?php
function load( $classname ) {

    $folders = [
        "class/",
        "class/Models/",
        "class/Repositories/",
        "services/"
    ];

    foreach( $folders as $folder ){
        $file = $folder . $classname . ".php";
        if( file_exists( $file ) ){
            require $file;
        }
    }

}

spl_autoload_register( "load" );
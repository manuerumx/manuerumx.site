<?php
// check if fields passed are empty
if(empty($_POST['name'])  		||
    empty($_POST['email']) 		||
    empty($_POST['message'])	||
    !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
{
    echo "No arguments Provided!";
    return false;
}

$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];

$to = 'mgrivera@gmail.com';
$email_subject = "Formulario de contacto:  $name";
$email_body = "Has recibido un nuevo correo desde el formulario de contacto.\n\n"."Estos son los detalles:\n\nNombre: $name\n\nEmail: $email_address\n\nMensaje:\n$message";
$headers = "From: mgrivera@gmail.com\n"; // ****ENTER WHO YOU WANT THE MESSAGE TO BE FROM HERE****
//$headers = "From: ".$email_address."\n";
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
return true;
?>
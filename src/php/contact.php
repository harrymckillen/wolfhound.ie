<?php
  require_once('config.php');

  // Very simple email script for the contact form.

  if($HTTP_RAW_POST_DATA){

    $object = json_decode($HTTP_RAW_POST_DATA);

    if($object->{'lastname'} == null){

      $subject = "[". $object->{'env'} ."] Contact Form Query: ". $object->{'query'};
      $message = $object->{'message'};
      $headers = "From:". strip_tags($object->{'name'}) ." <". strip_tags($object->{'email'}).">\r\n";
      $headers .= "Reply-To:". strip_tags($object->{'name'}) ." <". strip_tags($object->{'email'}).">\r\n";
      $headers .= "MIME-Version: 1.0\r\n";
      $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


      mail(TO_EMAIL, $subject, $message, $headers);

      $response = array('status' => 'huzzah', 'object' => $object);
      echo json_encode($response);
    }
    else {
      $response = array('status' => 'success');
      echo json_encode($response);
    }
  }
  else{
    echo "Well, this does nothing.";
  }
?>

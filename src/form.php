<?php

   if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $usernameRegisterForm = trim($_POST["username_register_form"]);
        $emailRegisterForm = trim($_POST["email_register_form"]);
        $locationRegisterForm = trim($_POST["location_register_form"]);

        $msg = "Username: $fname\n";
        $msg .= "Email: $lname\n";
        $msg .= "Location: $address\n";

        $to = "overday@wp.pl";
        $subject = "Wiadomośc z formularza od $usernameRegisterForm $emailRegisterForm!";
        $headers = "From: $usernameRegisterForm <$emailRegisterForm>";

        mail($to, $subject, $msg, $headers);

   } else {
        http_response_code(403);
        echo "Error, try again";
   }

?>

<?php
$data = '[{"id":"1","name":"wsscat"},{"id":"2","name":"asw"}]';
$data = "JSON_CALLBACK(" . $data . ")";
echo $data;
?>
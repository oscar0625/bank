<?php
sleep(1);
$a = ['name'=>$_GET['name'],'age'=>$_GET['age']];
echo json_encode($a);
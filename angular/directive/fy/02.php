<?php
$sql='SELECT COUNT(0) AS count FROM `qicai` ';
$p =new PDO('mysql:host=localhost;port=3306;dbname=test;charset=utf8', 'root', '');
$res=$p->query($sql,PDO::FETCH_OBJ);
$r=$res->fetchAll();
echo json_encode($r);
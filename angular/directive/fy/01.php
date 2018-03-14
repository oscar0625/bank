<?php
$page=$_GET['page'];
$size=$_GET['size'];
$sql='SELECT * FROM `qicai` LIMIT '.($page-1)*$size.','.$size;
$p =new PDO('mysql:host=localhost;port=3306;dbname=test;charset=utf8', 'root', '');
$res=$p->query($sql,PDO::FETCH_OBJ);
$r=$res->fetchAll();
echo json_encode($r);


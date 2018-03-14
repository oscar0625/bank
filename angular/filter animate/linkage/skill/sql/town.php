<?php
$value=$_GET['value'];
$sql='SELECT `code`, `name` FROM `t_address_town` WHERE `cityCode`='.$value;
$p=new PDO('mysql:host=localhost;port=3306;dbname=province;charset=utf8','root','');
$res=$p->query($sql,PDO::FETCH_OBJ);
$arr=$res->fetchAll();
echo json_encode($arr);

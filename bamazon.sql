CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE Products (
ItemID int AUTO_INCREMENT NOT NULL,
ProdName varchar(50) NOT NULL,
Dept varchar(50) NOT NULL,
Price DECIMAL(10,2) NOT NULL,
Qty int NOT NULL,
primary key (ItemID)
);

INSERT INTO Products (ItemID, ProdName, Dept, Price, Qty)
VALUES 
(1939, 'Batarang', 'Sports & Fitness', 1000.00, 66), 
(1954, 'The One Ring', 'Jewlery', 72919.54, 1),
(1998, 'Ocarina', 'Instruments', 11.21, 12),
(1997, 'Cloak of Invisibility', 'Apparel', 100.97, 1),
(1983, 'Red Luftballons', 'Party Supplies', 0.99, 99);

// ===== REQUIRED NPMS/DEPENDENCIES ===== //
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// ===== DATABASE + SERVER CONNECTION ===== //
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon_DB"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log ("CONNECTION TO SERVER SUCCESSFUL!")

    // run the createTable function after the connection is made to create table
    createTable();
  });


// ===== START APP ===== //

// ===== CREATE TABLE ===== //
var createTable = function(){
    connection.query("SELECT * FROM Products", function (err, res){
        // DEFINES AND CREATES TABLE
        var table = new Table({
            head: ['Product ID', 'Product Name', 'Department', 'Price', 'Qty'],
            style:{
                head:['blue'],
                compact: false,
                colAligns: ['center'],
            }
        });

        // LOOPS THROUGH ITEMS IN MYSQL
        for(var i=0; i < res.length; i++){
            table.push(
                [res[i].ItemID, res[i].ProdName, res[i].Dept, '$' + res[i].Price, res[i].Qty]
            );
        }

        // DISPLAYS TABLE IN CONSOLE
        console.log(table.toString());

        salePrompt();
        }
    )};

//=== FUNCTION TO PROMPT USER TO START A SALE ===//
//   function salePromt(res) {
//       // ASKS USER WHAT THEY WOULD LIKE TO PURCHASE
//       inquirer.prompt ({
//             name: "productID",
//             type: "input",
//             message: "Hello! What is the Product ID for the item you wish to purchase today? [Type 'Q' TO QUIT]"
//         }
//         // {
//         //     name: "purchaseQty",
//         //     type: "input",
//         //     message: "Thank you! How many would you like to purchase?"
//         // })
//         .then (function(answer){
//             var product 
//         });
//   }


// // ===== TO DOs ===== //
//     // === BASIC REQUIREMENTS === //
    
//     // 2 - Prompt user with two messages (inquirer)
//         // 2a - ask for ID of the product they wish to buy
//         // 2b - ask how many units they want to buy
//     // 3- Once "order" is placed, check if store has enough "stock"
//         // 3a - if not  app should log "INSUFFICIENT QUANTITY!" & cancel order.
//         // 3b - if yes, process order.
//     // 4 - Fulfill order 
//         // 4a - update sql database to reflect remaining qty
//         // 4b - show total cost of purchase












    // === CUSTOMER CHALLENGE === //
        // ADD product_sales, value updated with each indv prod total revenue from each sale
        // UPDATE so that when customer purchases anything, price of the product multiplied by qty purchase is added to 'product_sales' for that prod
        // ensure app still updats inventory listed in "products"
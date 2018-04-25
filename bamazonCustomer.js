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
    // run the start function after the connection is made to prompt the user
    startSale();
  });


  // ===== START APP ===== //

    // VARIABLES //
 const purchase = [];

  // 1 - Display all items available for sale w/ ids, names, and prices
  connection.query ('SELECT ProdID, ProdName, Price FROM Products', function(err, result){

  });

  function purchase() {
      inquirer
        .prompt ({
            name: "productID",
            type: "input",
            message: "Hello! What is the Product ID for the item you wish to purchase today?"
        },
        {
            name: "purchaseQty",
            type: "input",
            message: "Thank you! How many would you like to purchase?"
        })
        .then (function(){
            // code goes here
        });
  }


// ===== TO DOs ===== //
    // === BASIC REQUIREMENTS === //
    
    // 2 - Prompt user with two messages (inquirer)
        // 2a - ask for ID of the product they wish to buy
        // 2b - ask how many units they want to buy
    // 3- Once "order" is placed, check if store has enough "stock"
        // 3a - if not  app should log "INSUFFICIENT QUANTITY!" & cancel order.
        // 3b - if yes, process order.
    // 4 - Fulfill order 
        // 4a - update sql database to reflect remaining qty
        // 4b - show total cost of purchase












    // === CUSTOMER CHALLENGE === //
        // ADD product_sales, value updated with each indv prod total revenue from each sale
        // UPDATE so that when customer purchases anything, price of the product multiplied by qty purchase is added to 'product_sales' for that prod
        // ensure app still updats inventory listed in "products"
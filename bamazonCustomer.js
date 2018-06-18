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
    console.log ("CONNECTION TO SERVER SUCCESSFUL...")

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
        console.log("==============/// WELCOME TO BAMAZON ///===============")
        console.log(table.toString());

        salePrompt();
        }
    )};

//=== FUNCTION TO PROMPT USER TO START A SALE ===//
  function salePrompt(res) {
      // ASKS USER WHAT THEY WOULD LIKE TO PURCHASE
      inquirer.prompt ({
            name: "id",
            type: "input",
            message: "Hello! What is the Product ID for the item you wish to purchase today?"
        },
        // ASKS USER FOR QTY THEY WISH TO PURCHASE
        {
            name: "qty",
            type: "input",
            message: "Thank you! How many would you like to purchase?"
      }).then (function(answer){
    
        var purchaseItem = (answer.id);
        var saleQty = parseInt(answer.qty);
        var saleTotal = parseFloat(((res[purchaseItem].Price)*saleQty).toFixed(2));

        console.log("saleTotal");

        //stock qty check
        if (res[purchaseItem].stockQty >= saleQty){
            //qty update with purchase
            connection.query("UPDATE Products SET ? WHERE ?", [
                {
                    stockQty: (res[purchaseItem].stockQty - saleQty)
                },
                {
                    ItemID: answer.id
                }
            ], function (err, result){
                if(err) throw err;

                console.log("Purchase Successful! Your total is " + saleTotal + ". Your item(s) will be shipped within 3-5 business days. Thank you for choosing Bamazon!");
            });
        } 
        else {
            console.log("Sorry, Insuffecient quantities in stock!");
        }

        restart();

        });
  };

//=== Prompts user if they would like to make an additonal purchase ===//
function restart(){
    inquirer.prompt([{
        type: "confirm",
        name: "addlSale",
        message: "Would you like to purchase an additonal item(s)"
    }]).then(function(answer){
        if (answer.addlSale){
            salePrompt();
        } else{
            console.log("Have a nice day! Thank you for choosing Bamazon!")
        }
    });
}

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
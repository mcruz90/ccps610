import express from "express";
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql2.createConnection({
    host: '',
    user: '',
    password: '',
    database: 'ccps610bb',
    multipleStatements: true
})

app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.json("This is the backend")
})


/* Returns all products listed in BB_Product using SQL SELECT statement */

app.get("/BB_Product", (req, res)=>{
    const query_product = "SELECT * FROM BB_Product"
    db.query(query_product, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


// Adds a new product to BB_product by calling stored procedure
app.post("/BB_Product", (req,res)=>{
    const query_insert = "CALL PROD_ADD_SP(?)";

    const values = [
        req.body.ProductName,
        req.body.Description,
        req.body.ProductImage, 
        req.body.Price,
        req.body.Active
    ];

    db.query(query_insert, [values], (err,data) => {
        if (err) return res.json(err);
        return res.json("Product has been successfully added!");
    });

})

// Get individual product from its product id
app.get('/BB_Product/:id', (req, res) => {
    db.query(
      `SELECT * FROM BB_Product WHERE idProduct=${req.params.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
  });


  // Get product deal status

  app.get('/BB_Product/:id/salestatus', (req, res) => {

    const currDate = new Date().toJSON().slice(0,10);
    

    db.query(
      `SELECT CK_SALE_SF (?, ?)`,
      [
        currDate,
        req.params.id
    ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
  });

   

  // Update product's description and name

  app.put('/BB_Product/:id', (req, res) => {
    
    const query_update = "CALL SP_updateprod(?)";

    const values = [
        req.body.ProductName,
        req.params.id
    ];

    db.query(query_update, [values], (err,data) => {
        if (err) return res.json(err);
        return res.json("Product has been successfully updated!");
        console.log(data);
    });

  });


// Returns order status from mysql View to display on summary orders page

app.get("/bb_ship_vu", (req, res)=>{
    const query_basket = "SELECT * FROM bb_ship_vu"
    db.query(query_basket, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Gets info from BB_basketstaus to allow posting new data

app.get("/bb_basketstatus", (req, res)=>{
    const query_basket = "SELECT * FROM bb_basketstatus"
    db.query(query_basket, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Get individual order status from its order id

app.get('/bb_basketstatus/:id', (req, res) => {
    db.query(
      `SELECT * FROM BB_basketstatus WHERE idStatus=${req.params.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
  });


  // Update product's shipping status

  app.put('/bb_basketstatus/:id', (req, res) => {
    
    const query_update = "CALL STATUS_SHIP_SP(?)";

    const values = [
        req.body.idBasket,
        req.body.idStage,
        req.body.dtStage,
        req.body.shipper,
        req.body.ShippingNum
    ];

    db.query(query_update, [values], (err,data) => {
        if (err) return res.json(err);
        return res.json("Product has been successfully updated!");
    });

  });


/* TODO: execute VIEW below for above GET

CREATE OR REPLACE VIEW bb_ship_vu
 AS SELECT b.idbasket, b.shipflag, bs.idstage, bs.dtstage, bs.notes,
            bs.shipper, bs.shippingnum
      FROM bb_basket b, bb_basketstatus bs
      WHERE b.idBasket = bs.idBasket;
*/

/* Returns shopping cart listed in BB_basket through SQL SELECT statement */

app.get("/BB_basket", (req, res)=>{
    const query_basket = "SELECT * FROM BB_basket"
    db.query(query_basket, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

/* Returns state and tax rate listed in BB_Tax through SQL SELECT statement */

app.get("/BB_Tax", (req, res)=>{
    const query_basket = "SELECT * FROM BB_Tax"
    db.query(query_basket, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

/* For Shopping cart: Get all items for select basket id listed in BB_basketitem */

app.get("/BB_basketitem", (req, res)=>{
    const query_basket = "SELECT * FROM BB_basketitem WHERE idBasket=6"
    db.query(query_basket, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Adds product to shopping cart

app.post("/BB_BASKETITEM", (req,res)=>{
    const query_insert = "CALL BASKET_ADD_SP(?)";

    const values = [
        req.body.IdProduct,
        req.body.Price,
        req.body.Quantity,
        req.body.idBasket,
        req.body.optionone,
        req.body.optiontwo
    ];

    db.query(query_insert, [values], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });

})

// Get all items in shopping cart

app.get("/bb_basketitem_vu", (req, res)=>{
    const query_basket = "SELECT * FROM bb_basketitem_vu"
    db.query(query_basket, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Shopping cart: Check if all products in basket are in stock
app.get("/BB_basket_vu/stockstatus", (req, res)=>{

    const query_basket =  `
    SET @stockmessage = "";
    CALL COMPARE_STOCK_SP(@stockmessage);
    SELECT @stockmessage as stockmessage;
    `

    db.query(query_basket, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Get all items in a basket

app.get('/bb_basket_vu', (req, res) => {
  db.query(
    `SELECT * FROM BB_basket_vu`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.get('/bb_basketfilter/', (req, res) => {

  db.query(
    `SELECT * FROM BB_basketfilter`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

// filer all items in a basket given ID

app.post('/bb_basketfilter', (req, res) => {

  const q = 'CALL SP_filter_basket(?)';

  const values = [
    req.body.basketid
  ];

  db.query(q, [values], (err,data) => {
    if (err) return res.json(err);
    return res.json(data);
});

})


// reports: Check if all products in basket are in stock
app.get("/BB_basketfilter/stockstatus", (req, res)=>{

  const query_basket =  `
  SET @stockmessage = "";
  CALL COMPARE_BASKETSTOCK_SP(@stockmessage);
  SELECT @stockmessage as stockmessage;
  `

  db.query(query_basket, (err, data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})

// Get all customer purchases

app.get('/bb_basket/showall', (req, res) => {

  db.query(
    `SELECT bb_shopper.FirstName, bb_shopper.LastName, bb_basket.idShopper, TOTAL_PURCH_SF(bb_basket.idShopper) as TotalPurchases
    from BB_BASKET
    inner join bb_shopper on bb_shopper.idShopper = bb_basket.idShopper
    group by bb_basket.idShopper;`,

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});


app.listen(8800, ()=>{
    console.log("Backend sucessfully connected!")
})
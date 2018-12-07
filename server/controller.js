module.exports = {

     getInventory: (req, res) => {
          const dbInstance = req.app.get("db");
          dbInstance.get_inventory() //How can we call this here?
               .then( products => res.status(200).send(products) )
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in getInventory method"});
                    console.log(error);
               })
      },

     postProduct: (req, res) => {
          const dbInstance = req.app.get("db");
          const { name, price, imageUrl } = req.body;
          dbInstance.create_product( [name, price, imageUrl] )
               .then( () => res.sendStatus(200) )
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in postProduct method"});
                    console.log(error);
               })
     },

     deleteProduct: (req, res) => {
          const dbInstance = req.app.get("db");
          dbInstance.delete_product(req.params.id)
               .then( () => res.sendStatus(200) )
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in deleteProduct method"});
                    console.log(error);
               })
     },

     updateProduct: (req, res) => {
          const dbInstance = req.app.get("db");
          const { name, price, imageUrl } = req.body;
          dbInstance.update_product( [ req.params.id, name, price, imageUrl ] )
               .then( () => res.sendStatus(200) )
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in updateProduct method"})
                    console.log(error);
               })
     }

}
const router = require('express').Router()
const { User } = require('../db/models')
const { Order, LineItems, Spaceship } = require('../db/models')
module.exports = router

//GETS the order history
router.get('/orders/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: Number(req.params.userId)
    },
    include: [{ model: Spaceship }]
  })
    .then(orders => res.json(orders))
    .catch(next)
})


router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields 
    attributes: ['id', 'email', 'name', 'photo']
  })
    .then(users => res.json(users))
    .catch(next)
})

//Route to add a new item to the cart 
router.post('/:userId/cart/:orderId/:spaceshipId', (req, res, next) => {
  console.log("inside backend route ")
  LineItems.findOrCreate(
    {
      where: {
        orderId: Number(req.params.orderId),
        spaceshipId: Number(req.params.spaceshipId)
      },
      defaults: { quantity: Number(req.body.quantity) }
    }
  )
    .then(newLine => {
      if (newLine[1] === false) {
        newLine[0].increment("quantity", { by: req.body.quantity })
      }
      res.json(newLine)
    })
    .catch(next)
})

// GET CART

router.get('/:userId/cart', (req, res, next) => {
  console.log("what AM I? ", req.params.userId)
  if (req.params.userId === "guest") {

    Order.findOrCreate({
      where: {
        sessionId: req.session.id,
        status: 'open'
      }
      ,
      include: [{ model: Spaceship }]
    })
      .then(cart => {
        res.json(cart)
      })
  }
  else {
    Order.findOrCreate({
      where: {
        userId: Number(req.params.userId),
        status: 'open'
      }
      ,
      include: [{ model: Spaceship }]
    })
      .then(products => {
        res.json(products)
      })
      .catch(next)
  }
})


// CREATE NEW CART

router.post('/:userId/cart', (req, res, next) => {
  LineItems.create(
    req.body)
    .then(newLine => {
      res.json(newLine)
    })
    .catch(next)
})

// DELETE CART
//This is the route to clear the WHOLE cart  
// We're saying req.body will have the order Id as a property
router.delete('/:userId/cart', (req, res, next) => {
  if (req.params.userId === 'guest') {
    Order.destroy({
      where: {
        sessionId: req.session.id,
        status: 'open'
      }
    })
      .then(() => {
        res.status(200).send("Successfully deleted cart")
      })
      .catch(next)
  }
  else {
    Order.destroy({
      where: {
        userId: Number(req.params.userId),
        status: 'open'
      }
    })
      .then(() => {
        res.status(20).send("Successfully deleted cart")
      })
      .catch(next)
  }
})

// DELETE ITEM
//The following route will be used to delete just one line item
router.delete('/:userId/cart/:orderId/:spaceshipId', (req, res, next) => {
  LineItems.destroy({
    where: {
      spaceshipId: Number(req.params.spaceshipId),
      orderId: Number(req.params.orderId)
    }
  })
    .then(() => {
      res.status(204).send("Successfully deleted item")
    })
    .catch(next)
}
)

//UPDATE quantity of item in cart

router.put('/cart/:lineItemId', (req, res, next) => {
  LineItems.update(
    { quantity: req.body.quantity },
    { where: { id: req.params.lineItemId } }
  )
    .then(update => res.json(update))
    .catch(next)
})


//UPDATE ADDRESS

router.put(`/:userId/addAddress`, (req, res, next) => {
  let b = req.body.billing;
  let s = req.body.shipping;

  Order.findOne({ where: { userId: req.params.userId, status: 'open' } })
    .then(order => order.update({
      billingAddress: [b.address, b.city, b.state, b.zip, b.country],
      shippingAddress: [s.address, s.city, s.state, s.zip, s.country]
    }))
    .then(order => res.json(order))
    .catch(next)
})



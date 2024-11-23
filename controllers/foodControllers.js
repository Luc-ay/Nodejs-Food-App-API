const foodModels = require('../models/foodModels')

const createFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body

    if (!title || !description || !resturant) {
      return res.status(401).send({
        success: false,
        message: 'Please Provide All Fields',
      })
    }

    const newFood = new foodModels({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    })

    await newFood.save()
    res.status(201).send({
      success: true,
      message: 'New Food Item Created',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Create Food API',
      error: error.message,
    })
  }
}

// Get all food
const getAllFoods = async (req, res) => {
  try {
    const foods = await foodModels.find({})
    if (!foods) {
      return res.status(401).send({
        success: false,
        message: 'No food FOund',
      })
    }

    res.status(200).send({
      success: true,
      total: foods.length(),
      foods,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Getting FOods API',
      error: error.message,
    })
  }
}

// Get single food
const singleFood = async (req, res) => {
  try {
    const id = req.params.id
    const food = await foodModels.findById(id)
    if (!food) {
      return res.status(400).send({
        success: false,
        message: 'Food Not found || Invalid Food ID',
      })
    }

    res.status(200).send({
      success: true,
      Message: 'Get Food Successful',
      food,
    })
  } catch (error) {
    console.log(error)

    res.status(500).send({
      success: false,
      message: 'error in get single food API',
      error: error.message,
    })
  }
}

// Get single food
const resturantFood = async (req, res) => {
  try {
    const id = req.params.id
    const resturant = await foodModels.find({ resturant: id })
    if (!resturant) {
      return res.status(400).send({
        success: false,
        message: 'Food Not found for this resturant|| Invalid Food ID',
      })
    }

    res.status(200).send({
      success: true,
      Message: 'Get Resturant Food Successful',
      resturant,
    })
  } catch (error) {
    console.log(error)

    res.status(500).send({
      success: false,
      message: 'error in get single food API',
      error: error.message,
    })
  }
}

// Update Food
const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id
    if (!foodId) {
      res.status(400).send({
        succes: false,
        message: 'No Food ID FOund',
      })
    }

    const food = await foodModels.findById(foodId)
    if (!food) {
      res.status(400).send({
        succes: false,
        message: 'No Food FOund',
      })
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body
    const updatedFood = await foodModels.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
      },
      { new: true }
    )

    res.status(201).send({
      success: true,
      message: 'Food has been Updated',
    })
  } catch (error) {
    console.log(error)

    res.status(500).send({
      success: false,
      message: 'error in Update Food API',
      error: error.message,
    })
  }
}

module.exports = {
  createFood,
  getAllFoods,
  singleFood,
  resturantFood,
  updateFood,
}

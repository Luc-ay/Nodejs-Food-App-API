const resturantModel = require('../models/resturantModels')

const createResturant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body

    // Validation
    if (!title || !coords) {
      res.status(500).send({
        success: false,
        message: 'Provide the Required Fields',
      })
    }

    // add user input to DB
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    })
    await newResturant.save()
    // Send Successful Status Code and Message
    res.status(200).send({
      success: true,
      message: 'Resturant Created Successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in create resturant API',
    })
  }
}

const getAllResturantController = async (req, res) => {
  try {
    const resturant = await resturantModel.find({})
    if (!resturant) {
      return res.status(400).send({
        success: false,
        message: 'No Resturant Available',
      })
    }

    res.status(200).send({
      success: true,
      totalCount: resturant.length,
      resturant,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: true,
      message: 'Error From Get Resturant API',
    })
  }
}

const getResturantByID = async (req, res) => {
  try {
    const resturantId = req.params.id
    if (!resturantId) {
      return res.status(400).send({
        success: false,
        message: 'No resturant Found',
      })
    }
    // find resturant
    const resturant = await resturantModel.findById(resturantId)
    if (!resturant) {
      return res.status(400).send({
        success: false,
        message: 'No resturant Found',
      })
    }

    res.status(200).send({
      success: true,
      resturant,
    })
  } catch (error) {
    console.log({ error: error.message })
    res.status(500).send({
      success: false,
      message: 'Error in Get Resturant by ID API',
    })
  }
}

// Delete Resturant

const deleteResturant = async (req, res) => {
  try {
    const resturantId = req.params.id
    if (!resturantId) {
      return res.status(400).sned({
        success: false,
        message: 'No resturant Found Or Provide Resturant ID',
      })
    }

    await resturantModel.findByIdAndDelete(resturantId)
    res.status(200).send({
      success: true,
      message: 'Resturant Deleted Successfully',
    })
  } catch (error) {
    console.log({ error: error.message })
    res.status(500).send({
      success: false,
      message: 'Error in Delete Resturant API',
    })
  }
}

module.exports = {
  createResturant,
  getAllResturantController,
  getResturantByID,
}

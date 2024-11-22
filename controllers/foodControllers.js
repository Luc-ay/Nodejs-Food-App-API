const createFood = async (req, res) => {
  try {
    const { title, description, price, imageUrl, foodTags, category } = req.body
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Create Food API',
      error: error.message,
    })
  }
}

module.exports = { createFood }

const categoryModel = require('../models/categoryModel')

// Create New Category
const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body
    if (!title) {
      res.status(400).send({
        success: false,
        message: 'Category Title not provided',
      })
    }
    // Check if Category Existed

    const category = await categoryModel.findOne({ title })
    if (category) {
      res.status(400).send({
        success: false,
        message: 'Category already Existed',
      })
    }

    // Create New Category
    const newCategory = new categoryModel({ title, imageUrl })
    await newCategory.save()

    // Success Message
    res.status(201).send({
      success: true,
      message: 'Category Created Successfully',
      category,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      success: false,
      message: 'Error in Category api',
      error: error.message,
    })
  }
}

// Get All Category
const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({})
    if (!category) {
      res.status(400).send({
        success: false,
        message: 'No Category Found on Databsse',
      })
    }

    res.status(200).send({
      success: true,
      totalCat: category.length(),
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Get Category API',
      error: error.message,
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { title, imageUrl } = req.body
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    )
    if (!updateCategory) {
      res.status(400).send({
        success: false,
        message: 'No Category Found',
      })
    }

    res.status(201).send({
      success: true,
      message: 'Category Updated Successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Update Category API',
      error: error.message,
    })
  }
}

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const [id] = req.params
    if (!id) {
      res.status(400).send({
        success: false,
        message: 'Category not found',
      })
    }
    const category = await categoryModel.findById(id)
    if (!category) {
      res.status(400).send({
        success: false,
        message: 'Category not found in DataBase',
      })
    }

    await categoryModel.findByIdAndDelete(id)

    res.status(200).send({
      success: true,
      Message: 'Category Deleted Successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Delete Category API',
      error: error.message,
    })
  }
}

module.exports = { createCategory, getCategory, updateCategory, deleteCategory }

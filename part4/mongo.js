const mongoose = require('mongoose')
const Blog = require('./models/blog')
require('dotenv').config()

const url = process.env.TEST_MONGODB_URI
console.log(url)

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {

  const blog = new Blog({
    title: 'test3',
    author: '12345678',
    url: 'www.test3.dk',
    likes: 120
  })

  blog.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })

  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
})
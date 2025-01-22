const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'test1',
    author: '12345678',
    url: 'www.haba.dk',
    likes: 120
  },
  {
    title: 'test2',
    author: '12345678',
    url: 'www.mungo.dk',
    likes: 1960
  },
  {
    title: 'test3',
    author: '12345678',
    url: 'www.diosmio.dk',
    likes: 30
  }
]

module.exports = {
  initialBlogs,
}
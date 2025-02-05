const Blog = require('../models/blog')
const User = require('../models/user')


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
  },
  {
    title: 'test4',
    author: '12345678',
    url: 'www.majs.dk',
    likes: 9
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
  {
    username: 'Tiger',
    name: 'Tigram Hamasalan',
    password: 'abc123'
  },
  {
    username: 'Løve',
    name: 'Leuben Farheiten',
    password: 'Løvefarersød'
  },
  {
    username: 'Grib G.',
    name: 'Greben Trams',
    password: '14storeløkker'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}
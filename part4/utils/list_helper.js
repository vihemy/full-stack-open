const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, post) => total + post.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined
  return blogs.reduce((maxObj, currentObj) => {
    return currentObj.likes > maxObj.likes ? currentObj : maxObj
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const counts = _.countBy(blogs, 'author')
  const [author, posts] = _.maxBy(_.entries(counts), ([, posts]) => posts)
  return { author, posts }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = _.map(groupedByAuthor, (posts, author) => ({
    author,
    likes: _.sumBy(posts, 'likes')
  }))
  const authorWithMostLikes = _.maxBy(authorLikes, 'likes')
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
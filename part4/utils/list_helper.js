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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
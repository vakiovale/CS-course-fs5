let token = null

const blogs = [
  {
    author: 'Valtteri',
    title: 'Otsikko',
    url: 'URL',
    likes: 42
  },
  {
    author: 'Valtteri2',
    title: 'Otsikko2',
    url: 'URL',
    likes: 2
  }
]

const getAll = () => {
  const all = Promise.resolve(blogs)
  console.log(all)
  return all
}

export default { getAll, blogs }
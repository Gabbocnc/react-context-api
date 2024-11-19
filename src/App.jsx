import { useState, useEffect } from 'react'
import './App.css'

const initialBlog = [

  {
    name: '',
    status: '',
    image: '',
    content: '',
    tags: ''
  }


]



function App() {

  const [articles, setArticles] = useState(initialBlog)
  const [newArticle, setNewArticle] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredArticles, setFilteredArticles] = useState([])



  useEffect(() => {
    const filtered = articles.filter((article) => article.name && article.name.toLowerCase().includes(searchText.toLowerCase()))
    setFilteredArticles(filtered)
  }, [articles, searchText])


  function addArticle(e) {
    e.preventDefault()

    const newArticles = [
      newArticle,
      ...articles
    ]
    setArticles(newArticles)

    setNewArticle('')
  }

  function handleTrashTaskClick(e) {
    e.preventDefault()

    const taskIndexToTrash = Number(e.target.getAttribute('data-index'))

    const newArticles = articles.filter((article, index) => index != taskIndexToTrash)

    setArticles(newArticles)
  }

  function handleSearchForm(e) {
    e.preventDefault()

  }










  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h1>My Blog</h1>

          <form onSubmit={handleSearchForm}>
            <div className="mb-3">

              <input
                type="search"
                className="form-control"
                name="searchText"
                id="searchText"
                aria-describedby="searchHelper"
                placeholder=" Search ..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />

            </div>

          </form>

        </div>


        {/* New Blog */}

        <form onSubmit={addArticle}>
          <div className="mb-3">
            <label htmlFor="task" className="form-label">Blog</label>

            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                placeholder="Add your Blog name"
                aria-label="Add your Blog name"
                aria-describedby="button-addon2"
                value={newArticle.name}
                onChange={e => setNewArticle(e.target.value)}
              />
              <input type="text"
                className="form-control"
                placeholder="Add your Blog content"
                aria-label="Add your Blog content"
                aria-describedby="button-addon2"
                value={newArticle.content}
                onChange={e => setNewArticle(e.target.value)}
              />
              <input type="text"
                className="form-control"
                placeholder="Add your Blog image"
                aria-label="Add your Blog image"
                aria-describedby="button-addon2"
                value={newArticle.image}
                onChange={e => setNewArticle(e.target.value)}
              />

              <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Button</button>
            </div>

            <small id="taskHelperId" className="form-text text-muted">Type your new Blog</small>
          </div>

        </form>

        {/* Blog List */}
        <ul className="list-group">

          {filteredArticles.map((article, index) =>
            <li key={index} className="list-group-item d-flex justify-content-between">
              {article.name}
              {article.content}
              {article.image}
              {article.tags}


              <button onClick={handleTrashTaskClick} data-index={index} className='btn btn-danger'>
                <i className="bi bi-trash"></i>
              </button>
            </li>)}

        </ul>

      </div>
    </>
  )
}

export default App

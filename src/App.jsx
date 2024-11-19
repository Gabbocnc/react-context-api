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
  const [newArticle, setNewArticle] = useState({
    name: '',
    status: '',
    image: '',
    content: '',
    tags: ''
  })
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

    setNewArticle({
      name: '',
      status: '',
      image: '',
      content: '',
      tags: ''
    })
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
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <h1>My Blog</h1>

        <form>
          <div className="mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* New Blog*/}
      <form onSubmit={addArticle}>
        <div className="mb-3">
          <label htmlFor="task" className="form-label">
            Blog
          </label>

          <div className="input-group mb-3">
            {/* BLOG NAME */}
            <input
              type="text"
              className="form-control"
              placeholder="Blog Name"
              value={newArticle.name}
              onChange={(e) =>
                setNewArticle({ ...newArticle, name: e.target.value })
              }
            />
            {/* BLOG CONTENT */}
            <input
              type="text"
              className="form-control"
              placeholder="Blog Content"
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
            />
            {/* BLOG IMG */}
            <input
              type="file"
              className="form-control"
              placeholder="Choose your image"
              accept='image/*'
              value={newArticle.image}
              onChange={(e) =>
                setNewArticle({ ...newArticle, image: e.target.value })
              }
            />
            {/* BLOG TAGS */}
            <input
              type="text"
              className="form-control"
              placeholder="Blog Tags"
              value={newArticle.tags}
              onChange={(e) =>
                setNewArticle({ ...newArticle, tags: e.target.value })
              }
            />

            <button className="btn btn-outline-secondary" type="submit">
              Add Blog
            </button>
          </div>

        </div>
      </form>

      {/* Blog List */}
      <ul className="list-group">
        {filteredArticles.map((article, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{article.name}</h5>
              <p>{article.content}</p>
              <img src={article.image} alt="Blog" style={{ width: "100px" }} />
              <p className="text-muted">{article.tags}</p>
            </div>
            <button
              onClick={handleTrashTaskClick}
              data-index={index}
              className="btn btn-danger"
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

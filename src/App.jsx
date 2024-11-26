import { useState, useEffect } from 'react'
import './App.css'
import AppMain from './components/AppMain'
import AppHeader from './components/AppHeader'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import BlogDetails from './pages/BlogDetails'


const initialBlog =

{
  title: '',
  status: '',
  image: '/img/0.jpg',
  content: '',
  tags: '',
  slug: ''
}

function App() {

  const navigate = useNavigate()
  const [postsData, setPostsData] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [newArticle, setNewArticle] = useState(initialBlog)
  const [searchText, setSearchText] = useState('')
  const [tagsSelected, setTagsSelected] = useState('')


  function fetchPostsData(url = 'http://localhost:3004') {
    fetch(url)
      .then(resp => resp.json())
      .then(data =>
        setPostsData(data)
        //console.log(data);

      )
    //console.log(postsData);

  }
  useEffect(fetchPostsData, [])


  function fetchDeletePost(slug) {
    const url = `http://localhost:3004/${slug}`;


    fetch(url, {
      method: 'DELETE',
    })
      .then(resp => {
        /*  console.log('Response:', resp); */
        return resp.json();
      })

      .then(data => {
        setPostsData(data.data);
      })
    console.log(postsData);

  }


  useEffect(() => {
    const filtered = postsData.filter((post) =>
      post.title && post.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [postsData, searchText]);


  function addArticle(e, url = 'http://localhost:3004') {
    e.preventDefault()
    const slug = newArticle.title.trim().toLowerCase()

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...newArticle,
        slug
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(resp => {
        return resp.json();
      })

      .then(data =>
        setPostsData(data.data)
      )
    console.log(postsData);

    setNewArticle(initialBlog)

  }


  function hadleSelectedTags(e) {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    setNewArticle({
      ...newArticle,
      [e.target.name]: capitalize(e.target.value),
    });
  }



  return (
    <div className='bg-dark'>


      <BrowserRouter>

        {/* rotte */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={
            <div className="dflex container bg-dark">


              <div className="row">

                <div className="col-12">
                  <div className="container">
                    <AppHeader setSearchText={setSearchText} searchText={searchText} />
                  </div>
                  <AppMain
                    addArticle={addArticle}
                    newArticle={newArticle}
                    tagsSelected={tagsSelected}
                    hadleSelectedTags={hadleSelectedTags}
                    filteredArticles={filteredArticles}
                    setNewArticle={setNewArticle}
                  />
                </div>
                <div className="col-12">
                  <div className="row">
                    {
                      filteredArticles ?
                        filteredArticles.map((data, index) => (
                          <div className="col-6 p-3 position-relative" key={index}>
                            <div className="card bg-secondary mb-3 text-white p-3">
                              <h2 className="mb-2">{data.title}</h2>
                              <div>{data.content}</div>
                              <div className="mt-3 mb-3">
                                <img src={data.image} style={{ maxWidth: 400, maxHeight: 300 }} alt="" />
                              </div>
                              <div className="tags">{data.tags}</div>
                              <div className="status">
                                <strong>Blog Status : </strong>{data.status}
                              </div>
                              <div className="position-absolute end-0 bottom-0 p-2">
                                <button className="bg-danger" onClick={() => fetchDeletePost(data.slug)}>
                                  <i className="bi bi-trash text-white"></i>
                                  <button
                                    className="btn btn-dark text-white"
                                    onClick={() => navigate(data.slug)}
                                  >
                                    Go to Post
                                  </button>
                                </button>
                              </div>
                            </div>
                          </div>
                        )) :
                        <p>No results yet</p>
                    }

                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/blog/:slug" element={<BlogDetails />} />
        </Routes>


      </BrowserRouter >

    </div >
  );
}

export default App
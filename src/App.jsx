
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'
import './App.css'
import AppMain from './components/AppMain'
import AppHeader from './components/AppHeader'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import BlogDetails from './pages/BlogDetails'
import BlogList from './components/BlogList'
import GlobalContext from './context/GlobalContext'


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
    <GlobalContext.Provider value={{ BlogList }}>

      <div className='bg-dark'>


        <BrowserRouter>

          {/* rotte */}

          <Routes>
            {/* rotta home page */}
            <Route path="/" element={<Home />} />

            {/* rotta contatti */}
            <Route path="/contact" element={<Contact />} />

            {/* rotta about */}
            <Route path="/about" element={<About />} />

            {/* rotta per i blog  */}
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
                    <BlogList filteredArticles={filteredArticles} fetchDeletePost={fetchDeletePost} />
                  </div>
                </div>
              </div>
            } />

            {/* rotta per visualizzare singolo blog */}
            <Route path="/blog/:slug" element={<BlogDetails />} />


          </Routes>


        </BrowserRouter >

      </div >

    </GlobalContext.Provider>
  );
}

export default App
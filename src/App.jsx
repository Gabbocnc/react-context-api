import { useState, useEffect } from 'react'
import './App.css'
import AppMain from './components/AppMain'
import AppHeader from './components/AppHeader'
import { BrowserRoute, Routes, Route } from 'react-router-dom'

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
  const [newArticle, setNewArticle] = useState(initialBlog)
  const [searchText, setSearchText] = useState('')
  const [filteredArticles, setFilteredArticles] = useState([])
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


      <div className="container">
        <AppHeader setSearchText={setSearchText} searchText={searchText} />
        <AppMain addArticle={addArticle} newArticle={newArticle} tagsSelected={tagsSelected} hadleSelectedTags={hadleSelectedTags} filteredArticles={filteredArticles} setNewArticle={setNewArticle} />
      </div>


      <div className='dflex container bg-dark '>
        <div className="row">
          {
            filteredArticles ?

              filteredArticles.map((data, index) => (

                <div className="col-6 p-3 position-relative" key={index}>
                  <div className="card bg-secondary mb-3 text-white p-3">
                    <h2 className='mb-2'>
                      {data.title}
                    </h2>
                    <div>
                      {data.content}
                    </div>
                    <div className='mt-3 mb-3'>
                      <img src={data.image} style={{ maxWidth: 400, maxHeight: 300 }} alt="" />
                    </div>
                    <div className='tags'>
                      {data.tags}
                    </div>
                    <div className='status'>
                      <strong>Blog Status : </strong>{data.status}
                    </div>
                    <div className='position-absolute end-0 bottom-0 p-2'>
                      <button className='bg-danger' onClick={() => fetchDeletePost(data.slug)}><i className="bi bi-trash text-white" ></i></button>
                    </div>
                  </div>
                </div>

              )) :

              <p>No results yet</p>

          }
        </div>

      </div>




    </div>
  );
}

export default App
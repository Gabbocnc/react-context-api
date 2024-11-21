import { useState, useEffect } from 'react'
import './App.css'
import AppMain from './components/AppMain'
import AppHeader from './components/AppHeader'


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
  /* const [articles, setArticles] = useState(postsData) */
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

  /*   useEffect(() => {
      setArticles(postsData);
    }, [postsData]); */

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

  /*  function handleTrashTaskClick(e) {
     e.preventDefault()
 
     const taskIndexToTrash = Number(e.target.getAttribute('data-index'))
 
     const newArticles = articles.filter((article, index) => index != taskIndexToTrash)
 
     setArticles(newArticles)
   } */

  function hadleSelectedTags(e) {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value
    })
  }



  return (
    <div className="container" >


      <div className="container">
        <AppHeader setSearchText={setSearchText} searchText={searchText} />
        <AppMain addArticle={addArticle} newArticle={newArticle} tagsSelected={tagsSelected} hadleSelectedTags={hadleSelectedTags} filteredArticles={filteredArticles} setNewArticle={setNewArticle} />
      </div>

      {
        filteredArticles ?

          filteredArticles.map((data, index) => (

            <div className="col" key={index}>
              <div className="card bg-secondary mb-3 text-white">
                <h2 className='mb-3'>
                  {data.title}
                </h2>
                <div className='mb-3'>
                  {data.content}
                </div>
                <div>
                  <img src={data.image} style={{ maxWidth: 300 }} alt="" />
                </div>
                <div>
                  {data.tags}
                </div>
                <button onClick={() => fetchDeletePost(data.slug)}>Delete Post</button>
              </div>
            </div>

          )) :

          <p>No results yet</p>

      }



    </div>
  );
}

export default App
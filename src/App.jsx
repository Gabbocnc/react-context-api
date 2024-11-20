import { useState, useEffect } from 'react'
import './App.css'
import AppMain from './components/AppMain'
import AppHeader from './components/AppHeader'


const initialBlog = [

  {
    name: '',
    status: '',
    image: '/img/0.jpg',
    content: '',
    tags: ''
  }


]



function App() {

  const [articles, setArticles] = useState(initialBlog)
  const [newArticle, setNewArticle] = useState(initialBlog)
  const [searchText, setSearchText] = useState('')
  const [filteredArticles, setFilteredArticles] = useState([])
  const [tagsSelected, setTagsSelected] = useState('')
  const [postsData, setPostsData] = useState({})

  function fetchPostsData(url = 'http://localhost:3004') {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setPostsData(data)
      })
  }
  useEffect(fetchPostsData, [])


  function fetchDeletePost(slug) {
    const url = `http://localhost:3004/post/${slug}`;

    fetch(url, {
      method: 'DELETE',
    })
      .then(resp => {
        console.log('Response:', resp);
        return resp.json();
      })

      .then(data => {
        setPostsData(data);
      })
  }





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

  function hadleSelectedTags(e) {
    setTagsSelected(e.target.value)
  }




  return (
    <div className="container">

      {
        postsData.data ?

          postsData.data.map(data => (

            <div className="col" key={data.id}>
              <div className="card bg-secondary mb-3 text-white">
                <h2 className='mb-3'>
                  {data.title.toUpperCase()}
                </h2>
                <div className='mb-3'>
                  {data.content}
                </div>
                <div>
                  <img src={data.image} style={{ maxWidth: 300 }} alt="" />
                </div>
                <div>
                  {data.tags.join(',')}
                </div>
                <button onClick={() => fetchDeletePost(data.slug)}>Elimina</button>
              </div>
            </div>

          )) :

          <p>No results yet</p>

      }

      {/*  <div className="container">
        <AppHeader setSearchText={setSearchText} searchText={searchText} />
        <AppMain addArticle={addArticle} newArticle={newArticle} tagsSelected={tagsSelected} hadleSelectedTags={hadleSelectedTags} filteredArticles={filteredArticles} setNewArticle={setNewArticle} handleTrashTaskClick={handleTrashTaskClick} />
      </div> */}




    </div>
  );
}

export default App

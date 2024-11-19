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



      <div className="container">
        <AppHeader setSearchText={setSearchText} searchText={searchText} />
        <AppMain addArticle={addArticle} newArticle={newArticle} tagsSelected={tagsSelected} hadleSelectedTags={hadleSelectedTags} filteredArticles={filteredArticles} setNewArticle={setNewArticle} handleTrashTaskClick={handleTrashTaskClick} />
      </div>




    </div>
  );
}

export default App

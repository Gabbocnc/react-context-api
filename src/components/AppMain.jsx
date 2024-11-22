export default function AppMain({ addArticle, newArticle, tagsSelected, hadleSelectedTags, filteredArticles, setNewArticle, }) {


    return (
        <main>

            {/* New Blog*/}
            <form onSubmit={addArticle}>
                <div className="mb-3">
                    <label htmlFor="task" className="form-label text-white">
                        Blog Input
                    </label>

                    <div className="input-group mb-3 container">

                        {/* BLOG NAME */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Blog Name"
                            value={newArticle.title}
                            name='title'
                            onChange={(e) =>
                                setNewArticle({ ...newArticle, [e.target.name]: e.target.value })
                            }
                        />

                        {/* BLOG IMG */}
                        <input
                            type="file"
                            className="form-control"
                            placeholder="Choose your image"
                            accept='image/*'
                            name={'image'}
                            onChange={(e) => {
                                const fileImg = e.target.files[0];
                                const imageUrl = fileImg ? URL.createObjectURL(fileImg) : '/img/0.jpg';
                                setNewArticle({ ...newArticle, [e.target.name]: imageUrl });
                            }}
                        />

                        {/* BLOG TAGS */}
                        <div className="input-group input-group-sm mb-3 mt-3">
                            <select
                                className="form-select"
                                value={newArticle.tags}
                                onChange={hadleSelectedTags}
                                name={'tags'}

                            >
                                <option value="" disabled>Choose a Tags</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="js">JS</option>
                                <option value="nodeExpress">Node Express</option>
                            </select>
                        </div>

                        {/* Blog Status */}
                        <div className="input-group input-group-sm mb-3">

                            <select
                                id="status"
                                className="form-select"
                                value={newArticle.status}
                                name={'status'}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, [e.target.name]: e.target.value })
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="Draft">Private</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Pending</option>
                            </select>
                        </div>

                        {/* BLOG CONTENT */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Blog Content"
                            value={newArticle.content}
                            name={'content'}
                            onChange={(e) =>
                                setNewArticle({ ...newArticle, [e.target.name]: e.target.value })
                            }
                        />

                        <button className="btn btn-outline-secondary text-white" type="submit">
                            Add Blog
                        </button>
                    </div>

                </div>
            </form>

            {/* Blog List */}
            <ul className="list-group">

            </ul>
        </main>
    )
}
export default function AppMain({ addArticle, newArticle, tagsSelected, hadleSelectedTags, filteredArticles, setNewArticle, handleTrashTaskClick }) {


    return (
        <main>

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

                        {/* BLOG IMG */}
                        <input
                            type="file"
                            className="form-control"
                            placeholder="Choose your image"
                            accept='image/*'
                            onChange={(e) => {
                                const fileImg = e.target.files[0];
                                const imageUrl = fileImg ? URL.createObjectURL(fileImg) : '/img/0.jpg';
                                setNewArticle({ ...newArticle, image: imageUrl });
                            }}
                        />

                        {/* BLOG TAGS */}
                        <div className="input-group input-group-sm mb-3 mt-3">
                            <select
                                className="form-select"
                                value={tagsSelected}
                                onChange={hadleSelectedTags}
                            >
                                <option value="" disabled>Choose a Tags</option>
                                <option>HTML</option>
                                <option>CSS</option>
                                <option>JS</option>
                                <option>Node Express</option>
                            </select>
                        </div>

                        {/* Blog Status */}
                        <div className="input-group input-group-sm mb-3">

                            <select
                                id="status"
                                className="form-select"
                                value={newArticle.status}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, status: e.target.value })
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
                            onChange={(e) =>
                                setNewArticle({ ...newArticle, content: e.target.value })
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
                            <h5><strong>Title :</strong> {article.name}</h5>
                            <p><strong>Content :</strong> {article.content}</p>
                            <p className="text-muted">{article.tags}</p>
                            <img src={article.image} style={{ width: "100px" }} />
                            <p><strong>Tags : </strong>{tagsSelected}</p>
                            <p><strong>Status :</strong> {article.status}</p>
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
        </main>
    )
}
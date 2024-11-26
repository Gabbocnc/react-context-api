import Home from '../pages/Home'

export default function AppMain({ addArticle, newArticle, tagsSelected, hadleSelectedTags, filteredArticles, setNewArticle, }) {


    return (
        <main>

            <div>
                <Home />
                {/* Menu Toggle Button */}
                <button
                    className="btn btn-primary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#blogFormMenu"
                    aria-controls="blogFormMenu"
                >
                    Open Blog Form
                </button>

                {/* Offcanvas Menu */}
                <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="blogFormMenu"
                    aria-labelledby="blogFormMenuLabel"
                    style={{ '--bs-offcanvas-width': '500px' }}
                >
                    <div className="offcanvas-header offcanvas-style">
                        <h5 className="offcanvas-title" id="blogFormMenuLabel">
                            Add Blog
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <form onSubmit={addArticle}>
                            <div className="mb-3">
                                <label htmlFor="task" className="form-label text-dark">
                                    Blog Input
                                </label>

                                <div className="container">
                                    {/* BLOG NAME */}
                                    <div className="input-group input-group-sm mb-3 mt-3 input-name">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Blog Name"
                                            value={newArticle.title}
                                            name="title"
                                            onChange={(e) =>
                                                setNewArticle({ ...newArticle, [e.target.name]: e.target.value })
                                            }
                                        />
                                    </div>


                                    {/* BLOG IMG */}
                                    <div className="input-group input-group-sm mb-3 mt-3 input-img">
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            name="image"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                const imageUrl = file ? URL.createObjectURL(file) : "";
                                                setNewArticle({ ...newArticle, image: imageUrl });
                                            }}
                                        />
                                    </div>


                                    {/* BLOG TAGS */}
                                    <div className="input-group input-group-sm mb-3 mt-3 input-tag">
                                        <select
                                            className="form-select"
                                            value={newArticle.tags}
                                            onChange={hadleSelectedTags}
                                            name="tags"
                                        >
                                            <option value="" disabled>
                                                Choose a Tag
                                            </option>
                                            <option value="html">HTML</option>
                                            <option value="css">CSS</option>
                                            <option value="js">JS</option>
                                            <option value="nodeExpress">Node Express</option>
                                            <option value="react">React</option>
                                        </select>
                                    </div>

                                    {/* BLOG STATUS */}
                                    <div className="input-group input-group-sm mb-3 input-status">
                                        <select
                                            id="status"
                                            className="form-select"
                                            value={newArticle.status}
                                            name="status"
                                            onChange={(e) => {
                                                const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                                                setNewArticle({
                                                    ...newArticle,
                                                    [e.target.name]: capitalize(e.target.value),
                                                });
                                            }}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Draft">Private</option>
                                            <option value="Published">Published</option>
                                            <option value="Archived">Pending</option>
                                        </select>
                                    </div>

                                    {/* BLOG CONTENT */}
                                    <textarea
                                        className="form-control"
                                        placeholder="Blog Content"
                                        value={newArticle.content}
                                        name="content"
                                        onChange={(e) =>
                                            setNewArticle({ ...newArticle, [e.target.name]: e.target.value })
                                        }
                                    ></textarea>

                                    <button
                                        className="btn btn-outline-secondary text-white mt-3 bg-primary"
                                        type="submit"
                                    >
                                        Add Blog
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    )
}
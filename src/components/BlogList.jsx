import { Link } from "react-router-dom"
export default function BlogList({ filteredArticles, fetchDeletePost, }) {
    return (


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
                                    </button>
                                    <Link className='btn btn-dark m-2' to={data.slug}>Go to Post</Link>
                                </div>
                            </div>
                        </div>
                    )) :
                    <p>No results yet</p>
            }
        </div>

    )
}
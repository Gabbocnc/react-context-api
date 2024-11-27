import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'

export default function BlogDetails() {
    /*     const navigate = useNavigate() */
    const [blog, setBlog] = useState(null)
    const [allBlogs, setAllBlogs] = useState([])
    const { slug } = useParams()
    const url = `http://localhost:3004/${slug}`
    console.log(url);

    useEffect(
        () => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    const keys = Object.keys(data)
                    console.log(keys);
                    if (keys.includes('error')) {

                        navigate('/404')

                    } else {
                        setBlog(data.data)
                        console.log(data);

                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        [])


    return (

        <>

            {
                blog ? (
                    <section className="blog_details">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <img src={blog.image} alt="" />
                                </div>
                                <div className="col">
                                    <h3>{blog.title}</h3>
                                    <div>
                                        <p>
                                            {blog.content}
                                        </p>
                                        <div className="tags">{blog.tags}</div>
                                    </div>
                                </div>
                            </div>
                            {/*     <button
                                className="btn btn-dark text-white"
                                onClick={() => navigate(blog.slug)}
                            >
                                PREVIOUS
                            </button>
                            <button
                                className="btn btn-dark text-white"
                                onClick={() => navigate(blog.slug)}
                            >
                                NEXT
                            </button> */}
                        </div>
                    </section>
                ) : (
                    <div>loading...</div>

                )
            }

        </>

    )

}
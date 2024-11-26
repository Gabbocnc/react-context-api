import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'

export default function BlogDetails() {
    const navigate = useNavigate()
    const [blog, setBlog] = useState(null)
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
                    <section className="pizza_details">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="card border-0 rounded-4 shadow-lg">
                                        <img className="card-img-top rounded-4" src={`http://localhost:3004/${blog.image}`} alt="" />
                                    </div>
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
                        </div>
                    </section>
                ) : (
                    <div>loading...</div>

                )
            }
        </>

    )

}
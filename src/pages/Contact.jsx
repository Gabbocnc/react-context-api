import MainMenu from '../components/MainHomePage'

export default function Contact() {
    return (
        <>
            <div className="container">
                <h1>My Blog</h1>
                <MainMenu />
            </div>
            <div className="contact container">

                <h3>Contattaci qui :</h3>
                <ul>
                    <li>
                        👉
                        <i className="bi bi-instagram"></i>
                        <a href="Instagram">Instagram</a>
                    </li>
                    <li>
                        👉
                        <i className="bi bi-facebook"></i>
                        <a href="Faceook">Facebook</a>
                    </li>
                    <li>
                        👉
                        <i className="bi bi-twitter-x"></i>
                        <a href="X">X</a>
                    </li>
                    <li>
                        👉
                        <i className="bi bi-envelope"></i>
                        <a href="Email">Email</a>
                    </li>

                </ul>


            </div>
        </>
    )
}
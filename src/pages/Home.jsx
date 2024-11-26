import MainHomePage from "../components/MainHomePage"

export default function Home() {
    return (
        <>
            <header className="container">
                <h1>My Blog</h1>
                <MainHomePage />
            </header>

            <main
                style={{
                    backgroundImage: 'url("https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)'
                }}
            >
            </main>


            <footer>

            </footer>


        </>

    )

}
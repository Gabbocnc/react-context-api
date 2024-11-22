export default function AppHeader({ setSearchText, searchText }) {
    return (
        <header>
            <h1 className="text-white">My Blog</h1>

            <div className="mb-3 mt-3">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
        </header>
    )
}



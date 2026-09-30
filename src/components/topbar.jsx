
function TopBar() {
    return (
        <>
        <div className="blur-fade"/>
        <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6">
            <span className="bubble-text">Bubbles</span>
            <nav className="flex gap-6 bubble-txt">
                <a href="#">Home</a>
                <a href="#">About</a>
            </nav>
        </header>
        </>
    );
}

export default TopBar;
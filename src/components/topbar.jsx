
import BubbleLink from "./bubble-a";

function TopBar() {
    return (
        <>
        <div className="blur-fade"/>
        <header className="fixed top-3 z-50 flex h-16">
            <span className="fixed inset-x-0 flex justify-between px-5 navtab">Bubbles</span>
            <nav className="fixed inset-0 top-3 flex justify-center gap-10 navtab">
                <BubbleLink href="#" text="Tab 1" height="h-20" width="w-25"/>
                <BubbleLink href="#" text="Tab 2" height="h-20" width="w-25"/>
            </nav>
        </header>
        </>
    );
}

// fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-5


export default TopBar; 
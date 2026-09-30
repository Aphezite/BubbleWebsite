

import { useState } from "react";
import BubbleLink from "./bubble-a";

function TopBar() {
    const [selected, setSelected] = useState("Home");

    return (
        <>
        <div className="blur-fade"/>
        <header className="fixed top-3 z-50 flex h-16">
            <nav className="fixed inset-x-0 flex justify-between px-5 navtab pointer-events-none">
                <BubbleLink to="/" text="Bubbles" height="h-20" width="w-35" selected={selected==="Home"} onClick={() => setSelected("Home")}/>
            </nav>
            
            <nav className="fixed inset-0 top-3 flex justify-center gap-10 navtab pointer-events-none">
                <BubbleLink to="/tab1" text="Tab 1" height="h-20" width="w-25" selected={selected==="Tab 1"} onClick={() => setSelected("Tab 1")}/>
                <BubbleLink to="/tab2" text="Tab 2" height="h-20" width="w-25" selected={selected==="Tab 2"} onClick={() => setSelected("Tab 2")}/>
                <BubbleLink to="/tab3" text="Tab 3" height="h-20" width="w-25" selected={selected==="Tab 3"} onClick={() => setSelected("Tab 3")}/>
            </nav>
        </header>
        </>
    );
}

// <span >Bubbles</span>

export default TopBar; 
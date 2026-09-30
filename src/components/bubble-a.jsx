import { useEffect, useRef, useState } from "react";

const rand = (min,max) => min+Math.random()*(max-min);

const softZone = 5;
const jelly = [
    {transform:"scale(1,1)"},
    {transform:"scale(1.1,0.9)",offset:0.3},
    {transform:"scale(0.95,1.05)",offset:0.5},
    {transform:"scale(1.05,0.97)",offset:0.7},
    {transform:"scale(1,1)"},
]

const click = [
    {transform:"scale(1,1)"},
    {transform:"scale(0.8,0.8)",offset:0.2},
    {transform:"scale(1.25,0.85)",offset:0.45},
    {transform:"scale(0.92,1.08)",offset:0.65},
    {transform:"scale(1.04,0.98)",offset:0.82},
    {transform:"scale(1,1)"},
]

function BubbleLink({ text, height = "h-32", width = "w-32", href}) {
    const [s] = useState(() => ({
        x: {animationDuration:`${rand(4,5)}s`, animationDelay:`${-rand(0,4)}s`},
        y: {animationDuration:`${rand(2,3)}s`, animationDelay:`${-rand(0,3)}s`},
        q: {animationDuration:`${rand(1,2)}s`, animationDelay:`${-rand(0,2)}s`},
    }));

    const [pushing,setPushing] = useState(false);
    const [hovered,setHovered] = useState(false);

    const pushRef = useRef(null);
    const squishRef = useRef(null);
    const sim = useRef({
        x:0,y:0,tx:0,ty:0, // current target offset
        a:1,b:1,tA:1,tB:1,angle:0, // current target squish
        snapped:false, raf:0,
    });

    const handleClick = (e) => {
        squishRef.current.getAnimations().forEach((a) => a.cancel());
        squishRef.current.animate(click, {duration:700,easing:"ease-out"});
        onClick?.(e); 
    };

    useEffect(() => {
        const st = sim.current;

        const render = () => {
            pushRef.current.style.transform = `translate(${st.x}px, ${st.y}px)`;
            squishRef.current.style.transform = `rotate(${st.angle}deg) scale(${st.a}, ${st.b}) rotate(${-st.angle}deg)`
        };

        const tick = () => {
            const k = 0.25;
            st.x += (st.tx-st.x)*k;
            st.y += (st.ty-st.y)*k;
            st.a += (st.tA-st.a)*k;
            st.b += (st.tB-st.b)*k;
            render();
            const settled = 
                Math.abs(st.tx-st.x) < 0.05 && Math.abs(st.ty-st.y)<0.05 &&
                Math.abs(st.tA-st.a) < 0.001 && Math.abs(st.tB-st.b)<0.001;
            st.raf = settled ? 0 : requestAnimationFrame(tick);
        };
        const kick = () => {if (!st.raf) st.raf = requestAnimationFrame(tick);};

        const reset = () => {
            st.tx = st.ty = 0; st.tA = st.tB = 1;
            setPushing(false);
            setHovered(false);
            kick();  
        };

        const onMove = (e) => {
            const r = pushRef.current.getBoundingClientRect();
            const cx = r.left + r.width / 2 -st.x;  
            const cy = r.top + r.height / 2 -st.y;
            const hw = r.width / 2, hh = r.height / 2;
            const L = Math.max(hw-hh,0);
            
            const lx = e.clientX - cx, ly = e.clientY - cy;
            const px = Math.max(-L, Math.min(L,lx));
            const dx = px - lx, dy = -ly;
            const dist = Math.hypot(dx,dy) || 0.0001;
            const depth = hh-dist;

            if (depth <= 0) {  // Outside
                let wasInside = st.snapped;
                st.snapped = false; 
                reset();
                if (wasInside) squishRef.current.animate(jelly, {duration:600,easing:"ease-out"});
                return;
            }
            setHovered(true);
            if (st.snapped) return;

            if (depth > softZone) {
                st.snapped = true;
                reset();
                setHovered(true);
                squishRef.current.animate(jelly, {duration:600,easing:"ease-out"});
                return;
            }

            const nx = dx/dist, ny = dy/dist;
            st.tx = nx*depth*1.2;
            st.ty = ny*depth*1.2;
            st.angle=(Math.atan2(ny,nx)*180)/Math.PI;
            st.tA = 1 - depth * 0.015;
            st.tB = 1 + depth * 0.01;
            setPushing(true);
            kick();
        };

        window.addEventListener("pointermove", onMove);
        return () => {
            window.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(st.raf);
        };

    }, []);

    const pause = pushing ? "[animation-play-state:paused]": "";

    return (

        <div className={`relative ${height} ${width}`}>
            
            <div className="absolute inset-0">
            <div className={`animate-float-x ${pause}`} style={s.x}>
            <div className={`animate-float-y ${pause}`} style={s.y}>
            <div className={`animate-float-squish ${pause}`} style={s.q}>
                <div ref={pushRef} className="w-fit">
                <div ref={squishRef}>
                    <p 
                    style={{
                        background: `radial-gradient(circle at 10% 25%, #fcbecb, #f9b2c4, #d49bc6)`
                    }} 
                    className={`
                    ${height} ${width} 
                    rounded-full bg-gradient-to-br from 
                    shadow-lg`} />
                </div>
                </div>
            </div>
            </div>
            </div>
            </div>

            <a href={`${href}`}
                className={`
                    absolute inset-0 flex items-center justify-center
                ${height} ${width}`}>
                    <p className="text-center navtab" data-hovered={hovered}>{text}</p>
            </a>

        </div>
           
    
    );
}

// <span className="overflow-hiddden items-center justify-center text-center navtab" data-hovered={hovered}>{text}</span>


export default BubbleLink;
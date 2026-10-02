
import {useEffect,useId,useRef} from "react";

function outline(w, h, r, step=4) {
    const pts = [];
    const add = (x,y,nx,ny) => pts.push({x,y,nx,ny});
    const line = (x1,y1,x2,y2,nx,ny) => {
        const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2-y1)/ step ));
        for (let i = 0;i<n;i++) {
            const t = i/n;
            add(x1+(x2-x1)*t,y1+(y2-y1)*t,nx,ny);
        }
    };
    const arc = (cx,cy,a0) => {
        const n = Math.max(2,Math.round((Math.PI/2*r)/ step ));
        for (let i = 0;i<n;i++) {
            const a = a0 + (i/n)*(Math.PI/2);
            add(cx+Math.cos(a)*r,cy+Math.sin(a)*r,Math.cos(a),Math.sin(a));
        }
    };
    line(r,0,w-r,0,0,-1);
    arc(w-r,r,-Math.PI/2);
    line(w,r,w,h-r,1,0);
    arc(w-r,h-r,0);
    line(w-r,h,r,h,0,1);
    arc(r,h-r,Math.PI/2);
    line(0,h-r,0,r,-1,0);
    arc(r,r,Math.PI);
    return pts;
}

function WavyMenu({children, amp = 4, wavelength=300,speed=1,radius=28,className="",}) {
    const boxRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const box = boxRef.current;
        const path = pathRef.current;
        let w = box.clientWidth;
        let h = box.clientHeight;
        let raf;

        const ro = new ResizeObserver(() => {
            w = box.clientWidth;
            h = box.clientHeight;
        });
        ro.observe(box);

        const draw = (ms) => {
            const t = (ms/1000) * speed;
            const r = Math.min(radius, w/2, h/2);
            const pts = outline(w,h,r);
            const waves = Math.max(4,Math.round((pts.length*4)/wavelength));
            let d = "";
            pts.forEach((p,i) => {
                const o = Math.sin((i/pts.length)*Math.PI*2*waves-t)*amp;
                d += `${i?"L":"M"}${p.x+p.nx*o},${p.y+p.ny*o}`;
            });
            path.setAttribute("d", d+"Z");
            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [amp, wavelength, speed, radius]);

    const gradId = "grad"+useId().replace(/:/g,"");

    return (
        <div ref={boxRef} className={`relative ${className}`}>
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible drop-shadow-lg">
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffb8ac"/>
                        <stop offset="100%" stopColor="#f3a293"/>
                    </linearGradient>
                </defs>
                
                <path 
                    ref={pathRef}
                    className="wavy-menu"
                />
            </svg>
            <div className="relative z-10 p-8">{children}</div>
        </div>
    );


}

//{`url(#${gradId})`}

export default WavyMenu;
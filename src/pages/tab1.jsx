

import { useState } from 'react'

import BubbleLink from '../components/bubble-a';
import WavyMenu from '../components/menu';
import BubbleBtn from '../components/bubble-btn';

function Tab1() {
    const [count, setCount] = useState(0)

    return (
        <main className='flex flex-col min-h-screen items-center gap-20 p-8 pt-60'>
            <div className='flex flex-col gap-0'>
            <h1>Welcome!</h1>
            <h2>...to Tab 1</h2>
            </div>
            
            <div className='flex flex-hor gap-20'>
                    <BubbleBtn text="Test"/>
                    <BubbleBtn text={`${count}`}
                    onClick={() => setCount(count+1)}/>
                    <BubbleBtn text="Hello"/>
            </div>
        </main>
    );
}

export default Tab1;

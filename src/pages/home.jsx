
import { useState } from 'react'

import BubbleLink from '../components/bubble-a';
import WavyMenu from '../components/menu';
import BubbleBtn from '../components/bubble-btn';

function Home() {
    const [count, setCount] = useState(0)

    return (
        <main className='flex flex-col min-h-screen items-center gap-20 p-8 pt-60'>
            <div className='flex flex-col gap-0'>
            <h1>Hello World!</h1>
            <h2>This is a demo</h2>
            </div>
            
            <div className='flex flex-hor gap-20'>
                    <BubbleBtn text="Test"/>
                    <BubbleBtn text={`${count}`}
                    onClick={() => setCount(count+1)}/>
                    <BubbleBtn text="Hello"/>
            </div>

            <WavyMenu className="w-270 h-190">
                <ul className='flex flex-col items-center gap-4'>

                <h2>I am a header for this menu</h2>

                
                <div className='img-wrapper w-200 h-100 rounded-[40px] shadow-lg'>
                    <img src=''></img>
                </div>

                <p className='text-center w-190'>This could be an image of something and this text could be talking about the image. But, it is not.</p>
                <BubbleBtn text="Learn more" height={120} width={200}/>

                </ul>
            </WavyMenu>

            <br/>
            <p>Test test test test test</p>
            <br/>
            <p>Test test test test test</p>
            <br/>
            <p>Test test test test test</p>
            <br/>
            <p>Test test test test test</p>
        </main>
    );
}

export default Home;
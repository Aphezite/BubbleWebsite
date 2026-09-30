import { useState } from 'react'
import BubbleBtn from './components/bubble-btn';
import TopBar from './components/topbar';
import BubbleLink from './components/bubble-a';


function App() {
  const [count, setCount] = useState(0)

  return (
    
    <main className='flex flex-col min-h-screen items-center gap-20 p-8 pt-60'>
      <TopBar />
      <div className='flex flex-col gap-0'>
          <h1>Hello World!</h1>
          <h2>This is a demo</h2>
      </div>
      
    <div className='flex flex-hor gap-20'>
          <BubbleBtn text="Test"
            className="center"/>
          <BubbleBtn text={`${count}`}
            className="center"
            onClick={() => setCount(count+1)}/>
          <BubbleBtn text="Hello"
            className="center"/>
    </div>
    <br />


    <br />
    <p>hdjfjkdjdjdjjjjff</p>
    <br />

      
    </main>
  );
}

export default App

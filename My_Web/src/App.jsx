
import { useState } from 'react'
import './App.css'
import Aboutus from './Components/Aboutus'
import Navbar from './Components/Navbar'
import Text from './Components/Text'
import Alerts from './Components/Alerts'

function App() {

  const[mode, setMode] = useState('light');
  const[alert , setAlert] = useState(null);

  const showAlert =(message,type) =>
  {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

const toggleMode =()=>
{
  if(mode === 'light')
  {
    setMode('dark');
    document.body.style.backgroundColor ='#061731';
    showAlert("Dark mode Enable ","success");
    document.title=' Text-Edits Dark-Mode';
    // setInterval(() => {
    //   document.title=' Text-Edits Is Fantastic !';
    // }, 2000);
    // setInterval(() => {
    //   document.title=' Install Now!';
    // }, 1500);
  }

  else
  {
    setMode('light');
    document.body.style.backgroundColor ='white';
    showAlert("Light mode Enable ","success");
    document.title=' Text-Edits Light-Mode';


  }
}

  return (
    <>
<Navbar title="TEdits" About="About us" mode={mode} toggleMode={toggleMode} />
<Alerts  alert={alert} />

<div className="container my-3">
<Text showAlert={showAlert} heading="Enter the text to Analyze below"  mode={mode}/>


</div>





{/*  flkfw;lfwej; vgmhjhgvuyujykf         */}




    </>
  )
}

export default App

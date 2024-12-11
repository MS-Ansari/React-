import { useState } from 'react';
import './App.css';
import Aboutus from './Components/Aboutus';
// Uncomment these imports if these components are needed
import Navbar from './Components/Navbar';
import Text from './Components/Text';
import Alerts from './Components/Alerts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#061731';
      showAlert('Dark mode enabled', 'success');
      document.title = 'Text-Edits Dark-Mode';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('Light mode enabled', 'success');
      document.title = 'Text-Edits Light-Mode';
    }
  };

  return (
    <>
      {/* Uncomment Navbar and Alerts if needed */}
      {/* <Navbar title="TEdits" About="About us" mode={mode} toggleMode={toggleMode} />
      <Alerts alert={alert} /> */}

      <div className="container my-3">
        {/* Uncomment Text component if needed */}
        {/* <Text showAlert={showAlert} heading="Enter the text to analyze below" mode={mode} /> */}
      </div>

      <Router>
      <Navbar title="TEdits" About="About us" mode={mode} toggleMode={toggleMode} />
      <Alerts alert={alert} />

        <Routes>
          {/* Define the route for the Aboutus component */}
          <Route path="/" element={<Text showAlert={showAlert} heading="Enter the text to analyze below" mode={mode} />} />
          <Route path="/About" element={<Aboutus />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

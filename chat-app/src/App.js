
import './App.css';
import {BrowserRouter as Router,Route, Routes, BrowserRouter} from  "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";




function App() {



  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
      <Route  path="/" element={<Join/>}></Route>
      <Route path="/chat" element={<Chat/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

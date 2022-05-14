import { Routes, Route, BrowserRouter} from 'react-router-dom'
import {IndexPage} from './Pages/index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/front" element={<IndexPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

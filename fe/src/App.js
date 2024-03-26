import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
function App() {
  const {loader} = useSelector(state => state.loaderReducer)
  return (
    <div>
 
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
         
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

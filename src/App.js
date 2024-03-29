import { Route, Routes } from "react-router-dom";
import Login from "./view/Login";
import Home from "./view/user/Home";
import AdminHome from "./view/admin/AdminHome";
import Register from "./view/Register";
import ViewPosts from "./view/admin/ViewPosts";
import LandingPage from "./view/LandingPage";
import About from "./view/About";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login">
          <Route index element={<Login />} />
        </Route>
        <Route path="/register">
          <Route index element={<Register />} />
        </Route>
        <Route path="/home">
          <Route index element={<Home />} />
        </Route>
        <Route path="/about">
          <Route index element={<About />} />
        </Route>
        <Route path="/">
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/admin-home">
          <Route index element={<AdminHome />} />
        </Route>
        <Route path="/admin-view-posts">
          <Route index element={<ViewPosts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

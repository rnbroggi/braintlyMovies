import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route, Link } from "react-router-dom";
import Layout from './components/Layout/Layout';
import FavoritesPage from './Pages/FavoritesPage';
import MovieDetailPage from './Pages/MovieDetailPage';
import MoviesPage from './Pages/MoviesPage';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

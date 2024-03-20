import * as React from "react";
import { Route, Routes } from "react-router-dom";

//Components
import { Footer, Navbar } from "./components";

//Pages
import {
  HomePage,
  DetailPage,
  ResultsPage,
  Layout,
  NotFoundPage,
} from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route exact path="/items" element={<ResultsPage />} />
          <Route exact path="/items/:id" element={<DetailPage />} />
          <Route exact path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from "@/components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

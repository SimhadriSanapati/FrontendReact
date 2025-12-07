import React, { useState } from "react";
import { addToCart } from "./Store";
import { useDispatch } from "react-redux";
import './Vegetables.css'; 

function Vegetables({ setPopup }) {
  const vegetables = [
    { id: 601, name: "Tomato", price: 20, photo: "https://imgs.search.brave.com/Q8sn0pnOws2PbxHDeqXhTxsqzssRRRZFp1y8uusIIH8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3Jvd2pveS5jb20v/aW1hZ2VzL3RodW1i/cy8wMDA1Nzk3X2Ny/ZW9sZS10b21hdG8t/cGxhbnRfOTAwLmpw/ZWc" },
    { id: 602, name: "Potato", price: 15, photo: "https://imgs.search.brave.com/QjmhtUX2pwFLiuNbKCq9URREoNYQ-oi2KhvDnEwxE6M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wb3Rh/dG9lcy1pLXBvdGF0/by1lYXRlci1pLWxv/dmUtbXktYW55LW1l/YWwtZGF5LXN1bmRh/eS1icmVha2Zhc3Qt/Z3JlYXQtdGltZS10/by11dGlsaXplLTY1/ODg5MzI1LmpwZw" },
    { id: 603, name: "Carrot", price: 25, photo: "https://imgs.search.brave.com/sYdQ9LkU8GbSeetL7BNoE9HlryjM-ZU4RnzQOWBc6s8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YWxtYW5hYy5jb20v/c2l0ZXMvZGVmYXVs/dC9maWxlcy9zdHls/ZXMvb3IvcHVibGlj/L2ltYWdlX25vZGVz/L2NhcnJvdHMtdGFi/bGVfcG9waWRhci1z/cy5qcGc_aXRvaz0t/NktEZWZYSw" },
    { id: 609, name: "Cucumber", price: 30, photo: "https://imgs.search.brave.com/pUag2StcF2rwey2A4LcyxnpHWFAxdYOuGOqUvyFtP1o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/MzAwNzcyL3Bob3Rv/L3BpbGUtb2YtZnJl/c2gtY3VjdW1iZXJz/LXdpdGgtb25lLWN1/dC1vcGVuLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1FaUpJ/YmVMeXd0ZmZ5QVlG/UXNMODZEUDZpZGhT/R2VlbW9PVmltX2pF/ZkJRPQ" },
    { id: 605, name: "Cabbage", price: 35, photo: "https://imgs.search.brave.com/jna6lm0xfAmRkI6XLTBzRyYnN4UGNrwyQsxsOmNYHII/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/MTExOTE2Mi9waG90/by95b3VuZy13aGl0/ZS1jYWJiYWdlLW9u/LXRoZS10YWJsZS13/aG9sZS1oZWFkLWFu/ZC1jdXQtcGllY2Vz/LndlYnA_YT0xJmI9/MSZzPTYxMng2MTIm/dz0wJms9MjAmYz1G/c3BrdW5lVkY2bEtu/bjZNUkQ2UEJHV0lZ/YXFoQVBPUzdtWF9v/RmFDVERrPQ" },
    { id: 606, name: "Spinach", price: 10, photo: "https://imgs.search.brave.com/cp7CCjIRU2JeuqTtDDIKTe0s_7JJAHOmHnyBqmVJcxs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vMzAvODI1MzAt/MDUwLTc5OTExREQ0/L1NwaW5hY2gtbGVh/dmVzLXZpdGFtaW5z/LXNvdXJjZS1wZXJz/b24uanBnP3c9NDAw/Jmg9MzAwJmM9Y3Jv/cA" },
    { id: 607, name: "Broccoli", price: 40, photo: "https://imgs.search.brave.com/dm_q7pmGhJLjM5UjfqGlmddscSpv65ffNagyKG3revk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTMv/NzEzLzk5Ny9zbWFs/bC9mcmVzaC1icm9j/Y29saS1oYXJ2ZXN0/LWhlbGQtaW4taGFu/ZC13aXRoLXZpYnJh/bnQtZ3JlZW4tbGVh/dmVzLWluLWdhcmRl/bi1waG90by5qcGc" },
    { id: 608, name: "Cauliflower", price: 35, photo: "https://imgs.search.brave.com/Oj8BFAk3SxbvOfw-s567qSIrVpmcJF3Ybt7Wb6CF9kA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgy/MjQwNTc3L3Bob3Rv/L2Jpbi1vZi1jYXVs/aWZsb3dlci1oZWFk/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9NTZJdEg2cTFl/S1NIWXJTVlN5VEdm/aU83enJMbjJ1Smt3/ZGozLWFOcUZkOD0" },
    { id: 611, name: "Capsicum", price: 25, photo: "https://imgs.search.brave.com/apSZeXuLKWFzA7yj3o-roJPj8y87L4oPo8JnLGTZI80/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2Lzg1LzMwLzc3/LzM2MF9GXzE2ODUz/MDc3MDZfZm9UOTdL/RDczbktwVnFoR2ZX/bzZKRUdIdjlIRUkz/QzYuanBn" },
    { id: 604, name: "Onion", price: 12, photo: "https://imgs.search.brave.com/kY6EAudr8jhvmVyo4nV7_J_mOX1A-QphFb7_wFZDke8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vdmFyaWFu/dHMvcThFQWFIbldG/V21rbU1GdFQ2MThw/Y0VXLzYyNGYwZGMx/ZGZmOWJkY2NhYjAz/MmY5M2MzM2U3OWRl/Nzg0ODE3NzBlNzll/MjFkM2IwNDY5ZGFm/NTFmMDI3OTc" },
    { id: 610, name: "Garlic", price: 50, photo: "https://imgs.search.brave.com/r3E-eX22jCcjU7EwgXdUAuiUVrIFahI6zcjUbA3doeQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c3RvY2tzbmFwLmlv/L2ltZy10aHVtYnMv/MjgwaC9vbmlvbnMt/Z2FybGljXzU2U1VU/TTU2VDUuanBn" },
    {id :611 , name :"sincah", price :1 ,photo:"https://imgs.search.brave.com/r3E-eX22jCcjU7EwgXdUAuiUVrIFahI6zcjUbA3doeQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c3RvY2tzbmFwLmlv/L2ltZy10aHVtYnMv/MjgwaC9vbmlvbnMt/Z2FybGljXzU2U1VU/TTU2VDUuanBn"}
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(vegetables.length / itemsPerPage);

  const displayedVegetables = vegetables.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const dispatch = useDispatch();

  return (
    <div className="veg-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/vegetable video.mov(1)" type="video/mp4" />
      </video>

      <h1>🚜 Fresh Vegetable Products 🌽</h1>

      <div className="veg-grid">
        {displayedVegetables.map((veg) => (
          <div className="veg-card" key={veg.id}>
            <img src={veg.photo} alt={veg.name} />
            <h3>{veg.name}</h3>
            <p>ID: {veg.id}</p>
            <p>Price: ₹{veg.price}</p>
            <button
              className="add-to-cart"
              onClick={() => {
                dispatch(addToCart(veg));
                setPopup("Added to cart!");
                setTimeout(() => setPopup(""), 1500);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}disabled={currentPage === 1}> Prev</button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Vegetables;

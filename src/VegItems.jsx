import React, { useEffect, useState } from "react";
import "./VegItems.css"; // Import CSS
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchVegProducts } from "./Store";

function VegItems({setPopup}) {
  // const vegProducts = [
  //   { 
  //       id: 701,
  //        name: "Paneer Butter Masala",
  //         price: 120,
  //          photo: "https://imgs.search.brave.com/6r1lUWVfws_7dAEqHzmy1T-Hb4_FVt84zxat2yPu8rc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFuaGVhbHRo/eXJlY2lwZXMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIx/LzA3L3BhbmVlci1i/dXR0ZXItbWFzYWxh/LTUwMHgzNzUud2Vi/cA"
  //        },
  //   { 
  //       id: 702,
  //        name: "Veg Biryani",
  //         price: 140,
  //          photo: "https://imgs.search.brave.com/2GRoeIKj-UI-tR25g_ajG465xojAvy48VTk_9iGMYVA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE1/OTg3NzU1Ny9waG90/by9taXgtdmVnZXRh/YmxlLXB1bGFvLXZl/Zy1iaXJ5YW5pLndl/YnA_YT0xJmI9MSZz/PTYxMng2MTImdz0w/Jms9MjAmYz1BT1JM/OUs0ZGRBUDFwbHBj/bEdLdVpZZHRycy13/N3JYSzljNTdsVnlv/NHpzPQ"
  //        },
  //   { id:703,
  //        name: "Aloo Gobi",
  //         price: 90,
  //          photo: "https://imgs.search.brave.com/rvOj4USQ9o-PPrEKVTfkIQK0b-jqXJ8qhI1OwgPq7es/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/b2xpdmVhbmRtYW5n/by5jb20vaW1hZ2Vz/L3VwbG9hZHMvMjAy/Ml8wM18yMl9hbG9v/X2dvYmlfMC5qcGc" 
  //       },
  //   { id:704,
  //        name: "Chole Masala",
  //         price: 110,
  //          photo: "https://imgs.search.brave.com/FMh9qk90Av8hnT3GHK7CXYKEg8_R82zOdsW7ZwnvHv8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/eW91dHViZS5jb20v/dmkvcWNEQXZfd21l/c1EvaHFkZWZhdWx0/LmpwZw"
  //        },
  //   { id: 705,
  //        name: "Dal Tadka",
  //         price: 80,
  //          photo: "https://imgs.search.brave.com/6BFE_2nfvC80KuRlCwcJdR-r4Se6_YrgqnVlcG7JcDM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yYWlu/Ym93cGxhbnRsaWZl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNS9EYWwt/VGFka2EtcGhvdG9z/LTE2LW9mLTE4Lmpw/Zw"
  //        },
  //   { id: 706,
  //        name: "Palak Paneer",
  //         price: 130,
  //          photo: "https://imgs.search.brave.com/F4BurZsMVnFOW9CsEKDErtY6q2uAnDHQBT-jPCzflNk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9keTNy/bWE3M2tvd2xwLmNs/b3VkZnJvbnQubmV0/L3VwbG9hZHMvMjAy/NS8xMS9QYWxhay1Q/YW5lZXItUmVjaXBl/LmpwZw"
  //        },
  //   { id: 707,
  //        name: "Vegetable Pakora",
  //         price: 70,
  //          photo: "https://imgs.search.brave.com/yyHidhP1sh2JwZxwvE31XQAGcDxdNqcBKbm3zM3guoY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bWFyaW9uc2tpdGNo/ZW4uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA0L1Zl/Z2V0YWJsZS1QYWtv/cmFzLXdpdGgtR3Jl/ZW4tQ2h1dG5leS0w/My5qcGc" 
  //       },
  //   { id:708,
  //        name: "Veg Spring Roll",
  //         price: 60,
  //          photo: "https://imgs.search.brave.com/GmDCV_M8HYDdIrdDwc-eYsNmQeTzFr_th0IUM_98EuU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGFzaGFzYXJ0aXNh/bmZvb2RzLmNvbS9i/bG9nL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzExL0Jha2Vk/LVZlZy1TcHJpbmct/Um9sbHMtNi5qcGc" 
  //       },
  //   { id: 709, 
  //       name: "Paneer Tikka",
  //        price: 150,
  //         photo: "https://imgs.search.brave.com/btBN2ilidsDaViNR-IcKDNY0JNhfiy1SJLxZvu6ZtVE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zaW1t/ZXJ0b3NsaW1tZXIu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIxLzA2L1BhbmVl/ci1LYXRoaS1Sb2xs/LmpwZw" 
  //       },
  //   { id: 710,
  //        name: "Masala Dosa",
  //         price: 90,
  //          photo: "https://imgs.search.brave.com/lDXZuB-iV-lewUxb8bzpYvr62TVHa9c_x4235L54Q9M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE2LzgyLzA0Lzc0/LzM2MF9GXzE2ODIw/NDc0MzRfTG1vN3Nj/R0NUV0llOXY1a1No/cVhLYWt5d1Npa3Bz/QXAuanBn"
  //        },
  //   { id: 711,
  //        name: "Idli Sambhar",
  //         price: 70,
  //          photo: "https://imgs.search.brave.com/MwuSQLlVb7pI4GSKtR9uPMTKW3DDZ8RJUyTvQGAGxdU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE2LzY3LzMyLzI1/LzM2MF9GXzE2Njcz/MjI1OTFfTlRMbjUw/MEUyTlZ5aVVkQTdQ/aTVOeTU2ak9ndUJR/VmIuanBn" 
  //       },
  //   { id: 712,
  //        name: "Mixed Veg Curry",
  //         price: 110,
  //          photo: "https://imgs.search.brave.com/UcV190s1YmtR98-QkE66dZBtN7mmHJL-iB1qrbe9g_U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibGlz/c2lzbXlmb29kLnNh/dGh5YXNhaS5vcmcv/d3AtY29udGVudC91/cGxvYWRzLzIwMTYv/MTEvbWl4ZWQtdmVn/LWN1cnJ5LmpwZw"
  //        }
  //];

  // call the thunk when page reloading
  useEffect (() => {
    dispatch(fetchVegProducts())
  },[]);

  // get the vegitems from yhe store
     const { Veg, loading, error } = useSelector((state) => state.vegproducts);


  // Pagination state
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 4; // Number of items per page

  // Calculate the products to show on current page
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = vegproducts.slice(indexOfFirstItem, indexOfLastItem);

  //  const totalPages = Math.ceil(vegProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

// Use Veg instead of vegproducts / vegProducts
const currentItems = Veg.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(Veg.length / itemsPerPage);

const dispatch = useDispatch();



  return (
    <div className="veg-container">
      <h1>These are Veg Products</h1>

      <div className="veg-grid">
        {Veg.map((item) => (
          <div className="veg-card" key={item.id}>
            <img src={item.photo} alt={item.name} />
            <h3>{item.name}</h3>
            <p>ID: {item.id}</p>
            <p>Price: ₹{item.price}</p>
            <button className="add-to-cart" onClick={()=>{dispatch(addToCart(item));setPopup("Added to cart!");setTimeout(() => setPopup(""), 1500);}}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default VegItems;

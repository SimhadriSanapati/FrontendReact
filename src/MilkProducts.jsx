import React from "react";
import "./MilkProducts.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./Store";


function MilkProducts({setPopup}) {
  const milkProducts = [
   
    // 🌟 Added Items Below
    {
      id: 801,
      name: "Milkshake",
      price: 90,
      photo: "https://imgs.search.brave.com/o3YX4JLxYw5TSeGqwULjNwoH4hbhoc6VZDq15EWp-OM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9taWxrc2hha2Ut/d2l0aC1waW5rLXdo/aXRlLWhlYXJ0cy10/b3AtcGluay13aGl0/ZS1zd2lybC1ib3R0/b21fNzMyODEyLTQx/NC5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA"
    },
    {
      id: 802,
      name: "Smoothie with Milk",
      price: 85,
      photo: "https://imgs.search.brave.com/-wMaAVU4y-bjnJ2cYk1V6JRDQEU3LLdWK9xnoeh-elU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9teXZl/Z2FubWluaW1hbGlz/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDMvT2F0/LU1pbGstU21vb3Ro/aWUtNS5qcGc"
    },
    {
      id: 803,
      name: "Lassi",
      price: 40,
      photo: "https://imgs.search.brave.com/UOg3rVUBssUuFUqwXUNo8pqHz0GX-CMzxkQHMTe-Se4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2hhcm1pc3Bhc3Np/b25zLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wOC9z/d2VldC1sYXNzaTIu/anBn"
    },
    {
      id: 804,
      name: "Masala Milk",
      price: 55,
      photo: "https://imgs.search.brave.com/OZQoxsW4vTssKDR-lH2aYnhU31fPATtxJGFSKfgLZdU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oZWJi/YXJza2l0Y2hlbi5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMDIvTWFzYWxh/LU1pbGstUmVjaXBl/LURvb2RoLU1hc2Fs/YS1NYXNhbGEtTWls/ay1Qb3dkZXItMi0x/MDI0eDY4My5qcGVn"
    },
    {
      id: 805,
      name: "Hot Chocolate",
      price: 95,
      photo: "https://imgs.search.brave.com/NOjsvQJMwi5qCQNSt53OFG4VKwSdjEHhW8TzjiF800A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9ob3QtY2hv/Y29sYXRlLXRvcHBl/ZC13aGlwcGVkLWNy/ZWFtLTI2MG53LTI2/MTk3ODYwNzkuanBn"
    },
    
  {
    id: 806,
    name: "Paneer Cubes",
    price: 120,
    photo: "https://imgs.search.brave.com/r0ATyOp3Y6QDBiZhshLP4nsSzNBE5A9lyCnUabqYpV4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cuc3ByaW5nZnJpZXNoLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8wMy9wYW5lZXItY3ViZXMuanBn"
  },
  {
    id: 807,
    name: "Butter",
    price: 150,
    photo: "https://imgs.search.brave.com/I9Yv3-vC8AdgsoUQPNMbBVK9brQlcUkdnL5M-XwiSyQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFnZXMuZmFybWVya2V0LmNvbS9jYXRhbG9nL3B1YmxpYy9idXR0ZXJfMTI4LnBuZw"
  },
  {
    id: 808,
    name: "Curd",
    price: 60,
    photo: "https://imgs.search.brave.com/xRJUVu7o8IMv8-Lj9lo5KhbCh_w5dCHyQdQ0N3XHvhY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdmcuY29tL2ltYWdlcy8xMTQ3NzcvY3VyZC5qcGc"
  },
  {
    id: 809,
    name: "Cheese Slices",
    price: 130,
    photo: "https://imgs.search.brave.com/NJYUd8gNi9uBhg0C99dErb6Ij_cLujPG3Q1E2rLHeEE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cubG9yZW1lLmNvbS9pbWFnZXMvY2hlZXNlLXNsaWNlcy5qcGc"
  },
  {
    id: 810,
    name: "Flavored Yogurt",
    price: 75,
    photo: "https://imgs.search.brave.com/sVuYH3jp2BVRdrq5YUXMg7x2gcTzpCgQn2LoDnq8pLQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcubGVjdHVyZS5jb20vZmlsZXMvZmlsZS1maWxlLzIwMTgvMDMvMDgvZjI2NTY1NjI0X3lvcmd1dF9mbGF2b3JlZC5qcGc"
  },
  {
  id: 811,
  name: "Chocolate Milk",
  price: 85,
  photo: "https://imgs.search.brave.com/V7G9lq6PJtbGMWykFoG0-4uXrQmITGCc2OhB7IVFzbs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcubGVjdHVyZS5jb20vZmlsZXMvZmlsZS1maWxlLzIwMTkvMDgvMTAvY2hvY29sYXRlLW1pbGstbGluZXIuanBn"
},
{
  id: 812,
  name: "Whipped Cream",
  price: 140,
  photo: "https://imgs.search.brave.com/OAjq1Ju5zXtCdBxi47FZqlWQO4Nqymj0_3k9p6W4dyM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcubGVjdHVyZS5jb20vZmlsZXMvZmlsZS1maWxlLzIwMTcvMDUvMjcvd2hpcHBlZC1jcmVhbS5qcGc"
},
{
  id: 813,
  name: "Evaporated Milk",
  price: 110,
  photo: "https://imgs.search.brave.com/3yQ2CKvIRr4xItWZk3O9x8F6d2XQpJ-J0_f6x6Kjq94/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcubGVjdHVyZS5jb20vZmlsZXMvZmlsZS1maWxlLzIwMTYvMDYvMjYvZXZhcG9yYXRlZC1taWxrLmpwZw"
},
{
  id: 814,
  name: "Sour Cream",
  price: 125,
  photo: "https://imgs.search.brave.com/paAxgV6W_kS1csnKxOMD38u5KOo6_r1vn0pBr6U93lQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcubGVjdHVyZS5jb20vZmlsZXMvZmlsZS1maWxlLzIwMTYvMDQvMTcvc291ci1jcmVhbS5qcGc"
},
{
  id: 815,
  name: "Condensed Milk",
  price: 100,
  photo: "https://imgs.search.brave.com/Eco5dlyZ3hU9oy6FxccQNzdpCFI_MbRHvG0n_pIQSq4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcubGVjdHVyZS5jb20vZmlsZXMvZmlsZS1maWxlLzIwMTcvMDEvMjcvY29uZGVuc2VkLW1pbGstZGFpcmllZC5qcGc"
},
{
  id: 816,
  name: "Kefir",
  price: 130,
  photo: "https://imgs.search.brave.com/8O8tVrMQ4xdGZ36PNLrQUPk7jlCm4yGG5eLc5wvFlCo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cubGVjdHVyZS5jb20vZmlsZXMvZmlsZS1maWxlLzIwMTkvMDYvMDMvS2VmaXIuanBn"
},
{
  id: 817,
  name: "Milk Powder",
  price: 180,
  photo: "https://imgs.search.brave.com/fp3JfXqf4LGtx2gr8qOgJwR_7mrj72qPfWiE1mV8-RQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcubGVjdHVyZS5jb20vZmlsZXMvZmlsZS1maWxlLzIwMTgvMDYvMDgvbWlsay1wb3dkZXIuanBn"
},

  ];
    const dispatch =useDispatch();
  return (
    <div className="milk-container">
      <h1>These are Milk Products </h1>
      <div className="milk-grid">
        {milkProducts.map((item) => (
          <div className="milk-card" key={item.id}>
            <img src={item.photo} alt={item.name} />
            <h3>{item.name}</h3>
            <p>ID: {item.id}</p>
            <p>Price: ₹{item.price}</p>
            <button className="add-to-cart"onClick={()=>{dispatch(addToCart(item));setPopup("Added to cart!");setTimeout(() => setPopup(""), 1500);}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MilkProducts;

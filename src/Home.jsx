import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchHomeProducts, removeFromCart } from "./Store";

function Home({setPopup}) {
  // Product data: now 5 items per category
  // const products = [
   
  //   { id: 801, category: "Milk", name: "Organic Whole Milk 1L", price: 50,
  //     photo: "https://imgs.search.brave.com/uWN0QH0o1mkvOdzyhV9J3ampm_gOboq4xlAK_uu4qs8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc2FpbnNidXJ5/cy1ncm9jZXJpZXMu/Y28udWsvZ29sLzc4/NDQ4MDEvMS82NDB4/NjQwLmpwZw" },

  //   { id: 802, category: "Milk", name: "Chocolate Flavored Milk 500ml", price: 60,
  //     photo: "https://imgs.search.brave.com/mcAa88OxjiPwTo26z8YU5cIVdhxKbCuXMrt8IdW8wq0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubWlsa2FuZG1v/cmUuY28udWsvaW1h/Z2UvdXBsb2FkL3df/aXcvZl9hdXRvLHFf/YXV0bzplY28vZF9i/YWNrX3VwX2ltYWdl/LmpwZyx3X2F1dG8s/Y19zY2FsZS92MS9w/cm9kdWN0cy83NDA0/N18xLmpwZw" },

  //   { id: 803, category: "Milk", name: "Fresh Cow Milk 1L", price: 45,
  //     photo: "https://imgs.search.brave.com/UdNGPfwylyBiG9YFpuijABviFE6TtdDAAfq2PD4ns1A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9rc2hl/dHJhZmFybS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjUv/MDIvS3NoZXRyYS1B/Mi1CdWZmYWxvLW1p/bGstNTAwbWwucG5n" },

  //   { id: 804, category: "Milk", name: "Toned Milk 1L", price: 42,
  //     photo: "https://imgs.search.brave.com/SHYbGCnBtNwYQNROVUa1aydOvjWsQqU0PYGJ1n4_jd4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aWlt/Zy50aXN0YXRpYy5j/b20vZnAvMi8wMDkv/MTcyL3RvbmUtbWls/ay0wODYuanBn" },

  //   { id: 805, category: "Milk", name: "Full Cream Milk 500ml", price: 35,
  //     photo: "https://imgs.search.brave.com/5D7tKQB0qNNRM3FEw4QEu4CKLK9U4X-mt-8iSajX0qU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc2FpbnNidXJ5/cy1ncm9jZXJpZXMu/Y28udWsvZ29sLzgw/OTE4NTAvMS82NDB4/NjQwLmpwZw" },

   
  //   { id: 601, category: "Vegetables", name: "Tomato", price: 20,
  //     photo: "https://imgs.search.brave.com/Q8sn0pnOws2PbxHDeqXhTxsqzssRRRZFp1y8uusIIH8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3Jvd2pveS5jb20v/aW1hZ2VzL3RodW1i/cy8wMDA1Nzk3X2Ny/ZW9sZS10b21hdG8t/cGxhbnRfOTAwLmpw/ZWc" },

  //   { id: 602, category: "Vegetables", name: "Potato", price: 15,
  //     photo: "https://imgs.search.brave.com/QjmhtUX2pwFLiuNbKCq9URREoNYQ-oi2KhvDnEwxE6M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wb3Rh/dG9lcy1pLXBvdGF0/by1lYXRlci1pLWxv/dmUtbXktYW55LW1l/YWwtZGF5LXN1bmRh/eS1icmVha2Zhc3Qt/Z3JlYXQtdGltZS10/by11dGlsaXplLTY1/ODg5MzI1LmpwZw" },

  //   { id: 603, category: "Vegetables", name: "Carrot", price: 30,
  //     photo: "https://imgs.search.brave.com/sYdQ9LkU8GbSeetL7BNoE9HlryjM-ZU4RnzQOWBc6s8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YWxtYW5hYy5jb20v/c2l0ZXMvZGVmYXVs/dC9maWxlcy9zdHls/ZXMvb3IvcHVibGlj/L2ltYWdlX25vZGVz/L2NhcnJvdHMtdGFi/bGVfcG9waWRhci1z/cy5qcGc_aXRvaz0t/NktEZWZYSw"  },

  //   { id: 604, category: "Vegetables", name: "Onion", price: 25,
  //     photo: "https://imgs.search.brave.com/kY6EAudr8jhvmVyo4nV7_J_mOX1A-QphFb7_wFZDke8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vdmFyaWFu/dHMvcThFQWFIbldG/V21rbU1GdFQ2MThw/Y0VXLzYyNGYwZGMx/ZGZmOWJkY2NhYjAz/MmY5M2MzM2U3OWRl/Nzg0ODE3NzBlNzll/MjFkM2IwNDY5ZGFm/NTFmMDI3OTc" },

  //   { id: 605, category: "Vegetables", name: "Cabbage", price: 35,
  //     photo: "https://imgs.search.brave.com/jna6lm0xfAmRkI6XLTBzRyYnN4UGNrwyQsxsOmNYHII/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/MTExOTE2Mi9waG90/by95b3VuZy13aGl0/ZS1jYWJiYWdlLW9u/LXRoZS10YWJsZS13/aG9sZS1oZWFkLWFu/ZC1jdXQtcGllY2Vz/LndlYnA_YT0xJmI9/MSZzPTYxMng2MTIm/dz0wJms9MjAmYz1G/c3BrdW5lVkY2bEtu/bjZNUkQ2UEJHV0lZ/YXFoQVBPUzdtWF9v/RmFDVERrPQ" },

    
  //   { id: 11, category: "Fruits", name: "Apple", price: 120,
  //     photo: "https://imgs.search.brave.com/83Eg2MUhU3MEi4XgEZr2zkZg6dfHM8hUYJy2ZZbju2w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yaXBl/LWFwcGxlLWZydWl0/cy0yMzI4Mjk0MS5q/cGc" },

  //   { id: 12, category: "Fruits", name: "Banana", price: 40,
  //     photo: "https://imgs.search.brave.com/cKsT-PTS4s0QDBwYHDji8j7Cix1dLE0JOqeOKeICyh4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iYW5h/bmEtMTIyMTk3NjUu/anBn" },

  //   { id: 13, category: "Fruits", name: "Grapes", price: 90,
  //     photo: "https://imgs.search.brave.com/r39LUXmOAUAo38eEsqpZIqAeZX0SP9iqF1wjgbj_EWo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU3/NjA4MDQ3L3Bob3Rv/L3RocmVlLWtpbmRz/LW9mLWdyYXBlcy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/VGJBWGtPZWxnYXNw/dVJ4M2NqQ1pJY3Zh/RktlUGFXaFp2UXR2/VkZMWm10Zz0" },

  //   { id: 14, category: "Fruits", name: "Pineapple", price: 70,
  //     photo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg" },

  //   { id: 15, category: "Fruits", name: "Watermelon", price: 60,
  //     photo: "https://imgs.search.brave.com/-hw46XrXwRk6N64SqF8BQc4OAbGTXnQONUVFGGSy-9w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMw/NzgzODcyOS9waG90/by9sYXJnZS1zbGlj/ZXMtb2YtcmlwZS13/YXRlcm1lbG9uLWFy/ZS1zZXJ2ZWQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU53/RVhPQ1dURDg5TW5y/N2NrTVBCMTJOeTZP/cW9Bbjg0Tld2alY3/NEMzdlk9" },

    
  //   { id: 16, category: "Snacks", name: "Chips", price: 30,
  //     photo: "https://imgs.search.brave.com/UY3n8aEnOA1_Gd-c0Kl2N1z9UhFWHBf0kRPdlYy6dCc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjYv/NDk2LzE1My9zbWFs/bC9wb3RhdG8tY2hp/cHMtZGVsaWNpb3Vz/LWJicS1zZWFzb25p/bmctc3BpY3ktZm9y/LWNyaXBzLXRoaW4t/c2xpY2UtZGVlcC1m/cmllZC1zbmFjay1m/YXN0LWZvb2QtaW4t/b3Blbi1iYWctcGhv/dG8uanBn" },

  //   { id: 17, category: "Snacks", name: "Salted Peanuts", price: 25,
  //     photo: "https://imgs.search.brave.com/baI7wczGfOi8JeiM-NDOMYA7_l8GqfZB6NY9U2BPV4Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE1/NDg3Njk2MS9waG90/by9zYWx0ZWQtcGVh/bnV0cy1jbG9zZS11/cC10b3Atdmlldy1s/b3RzLW9mLXJvYXN0/ZWQtcGVhbnV0cy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/YWFOcFZ6Y0hPTWFU/aWxoLXFpUWJjTUVT/MlNwYzhKOUQtMjhK/ZzNiMmh2dz0" },

  //   { id: 18, category: "Snacks", name: "Nachos", price: 50,
  //     photo: "https://imgs.search.brave.com/N5Tfbx7j6D-8GOU8COHHHdiKaGxnjRtofQN9nRCeG9c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/b2xkZWxwYXNvLmZy/Ly0vbWVkaWEvcHJv/amVjdC9nbWkvb2xk/ZWxwYXNvL29sZGVs/cGFzby1mci9vZXBw/L2FydGljbGVzL25h/Y2hvcy1uZXcucG5n/P2g9NDUwJmlhcj0w/Jnc9ODAwJnJldj1m/YzcxM2ViMThmOGI0/ODI3YmIwYjMwNDQ2/MDBlMGUwYyZoYXNo/PUIzQURGMEFGQTQ2/MjMyNDM5MDEwODc4/NTc3REJFMUJD" },

  //   { id: 19, category: "Snacks", name: "Biscuits", price: 20,
  //     photo: "https://imgs.search.brave.com/4SGT0dcJVkbUwQ38tihdHwbwYuhw_mwgWwi-NAtOqPQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/a2luZ2FydGh1cmJh/a2luZy5jb20vc2l0/ZXMvZGVmYXVsdC9m/aWxlcy9zdHlsZXMv/a2FmX3RodW1ibmFp/bC9wdWJsaWMvcmVj/aXBlX2xlZ2FjeS83/NzUzLTMtbGFyZ2Uu/anBnP2l0b2s9MHhJ/QjNqc0Y"
  //    },

  //   { id: 20, category: "Snacks", name: "Popcorn", price: 35,
  //     photo: "https://imgs.search.brave.com/6DRjptbjsfC0gCZyN7JywJLnh9jW8B5aJ5i8meeTURQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzcxLzY0LzUy/LzM2MF9GXzE1NzE2/NDUyNTRfVkNnS1Iz/YlZsa3IzWkx6MjhU/NlN1NjJnZUdZRjZj/WTUuanBn"
  //    },

   
  //   { id: 21, category: "Beverages", name: "Orange Juice", price: 60,
  //     photo: "https://imgs.search.brave.com/XKzRgadE41V6HzkKwTJqExOQu1HxmgUnEtiSOaPwavI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mcmVz/aC1vcmFuZ2UtanVp/Y2UtODg1NTI3Ni5q/cGc"
  //    },

  //   { id: 22, category: "Beverages", name: "Apple Juice", price: 55,
  //     photo: "https://imgs.search.brave.com/Ld9JYYgshHMOlV5HWbEW-EB0urJ5B-zULytdv2GZhKM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9hcHBsZS1qdWlj/ZS1nbGFzcy1pc29s/YXRlZC13aGl0ZS1z/dXJmYWNlXzE4MjI1/Mi00ODE1LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA"
  //    },

  //   { id: 23, category: "Beverages", name: "Lemon Soda", price: 40,
  //     photo: "https://imgs.search.brave.com/v82H2a4jdL8vH2lyrTkY3gXrdaw_CsKCMl3nJHlpGew/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9iYWtl/c2J5YnJvd25zdWdh/ci5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDEvTGVt/b24tU29kYS0yOC0z/NjB4MzYwLmpwZw"
  //    },

  //   { id: 24, category: "Beverages", name: "Cold Coffee", price: 80,
  //     photo: "https://imgs.search.brave.com/zVDLvXrqPd423q20-Jg7fGSlp7ytNhBLrKf3krvXQ_E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzAv/OTE5LzkyMC9zbWFs/bC9hLXN0cmVhbS1v/Zi1taWxrLWZyb20t/YS1qdWctaXMtcG91/cmVkLWludG8tYS10/YWxsLWdsYXNzLW9m/LWljZS1jb2xkLWNv/ZmZlZS1jYW5zLWZv/ci1zdG9yaW5nLWNv/ZmZlZS1wcmVwYXJh/dGlvbi1vZi1hLWRl/bGljaW91cy1kcmlu/ay1waG90by5qcGc"
  //    },

  //   { id: 25, category: "Beverages", name: "Milkshake", price: 70,
  //     photo: "https://imgs.search.brave.com/TBz3ubZc-sI4uOpZihiTiWSY0vTCydP6jAxbshpB2Lo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzUxLzg4LzM4/LzM2MF9GXzU1MTg4/Mzg4MF85UU9TVXVH/b3AwUlVUVkZZa0pT/ZHB2alA2TzlscXI4/OS5qcGc"
  //    },
  // ];

 
  const dispatch = useDispatch();

  // Access home products state from Redux
  const { Home: products, loading, error } = useSelector(
    (state) => state.homeproducts
  );

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchHomeProducts());
  }, [dispatch]);

  // Extract unique categories
  const categories = products ? [...new Set(products.map((p) => p.category))] : [];

  // Loading & Error handling
  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="home-container">
      <header className="banner">
        <h1>Welcome to EAT & MEET Store 🛒</h1>
        <p>Best products delivered to your door!</p>
      </header>

      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="category-title">{cat}</h2>
          <div className="products-grid">
            {products
              .filter((product) => product.category === cat)
              .map((product) => (
                <div className="product-card" key={product._id || product.id}>
                  <img src={product.photo} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                  <button
                    className="add-to-cart"
                    onClick={() => {
                      dispatch(addToCart(product));
                      setPopup("Added to cart!");
                      setTimeout(() => setPopup(""), 1500);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
export default Home;

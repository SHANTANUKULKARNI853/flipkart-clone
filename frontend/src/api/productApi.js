const BASE_URL = "http://localhost:5000"; // Update with deployed URL if needed

export const fetchProducts = async (category) => {
  try {
    const response = await fetch(`http://localhost:5000/api/products?category=${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


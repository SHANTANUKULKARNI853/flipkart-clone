const BASE_URL = "${process.env.REACT_APP_API_URL}"
; 

export const fetchProducts = async (category) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}
/api/products?category=${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


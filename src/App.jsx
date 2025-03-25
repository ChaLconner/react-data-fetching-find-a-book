import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [SearchText, setSearchText] = useState("");
  const [Books, setBooks] = useState([]);
  
  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  // searchFromServer function
  const searchFromServer = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      console.error("Error fetching book data", err);
    }
  };

  const debouncedSearch = debounce(searchFromServer, 500);

useEffect(() => {
    if (SearchText.trim()) {
      debouncedSearch(SearchText);
    }
  }, [SearchText, debouncedSearch]); 

  return (
    <div className="App">
      <h1>Find a book</h1>
      <div>
        <input
          type="text"
          placeholder="Search book"
          value={SearchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <ul>
        {Books.map((book) => (
          <li key={book.id}>
            <h4>{book.volumeInfo.title}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      setBooks(response.data.items || []); // เผื่อบางคำไม่มีผลลัพธ์
    } catch (error) {
      console.error("ดึงข้อมูลหนังสือผิดพลาด:", error);
    }
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          placeholder="พิมพ์ชื่อหนังสือ..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

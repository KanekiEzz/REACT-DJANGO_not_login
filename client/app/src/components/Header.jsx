import { useEffect, useState } from 'react'

export const Header = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books/');
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addBook = async () => {
    const BookData = {
      title: title,
      release_year: releaseYear,
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(BookData)
      });
      const data = await response.json()
      // Update the books state with the new book
      setBooks((prevBooks) => [...prevBooks, data]);

      // Optionally clear input fields
      setTitle("");
      setReleaseYear(0);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the book from the state
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
      } else {
        console.error('Failed to delete book:', response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateTitle = async (id, releaseYear) => {
    const BookData = {
      title: newTitle,
      release_year: releaseYear,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(BookData)
      });
      const data = await response.json()
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === id) {
            return data;
          } else
            return book;
        })
      )
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className='container max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold text-cyan-400 mb-6'>Add Book</h1>

      <div className='mb-6'>
        <input
          type='text'
          placeholder='Book Title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-cyan-500'
        />
        <input
          type='number'
          placeholder='Release Year...'
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          className='border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-cyan-500'
        />
        <button
          onClick={addBook}
          className='bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500'
        >
          Add Book
        </button>
      </div>

      <div>
        {books.map((book) => (
          <div key={book.id} className='bg-gray-100 p-4 mb-4 rounded-lg shadow-md flex items-center justify-between text-gray-600'>
            <div>
              <p className='text-md mb-2'>Title: <span className='font-bold'>{book.title}</span></p>
              <p className='text-md mb-4'>Release Year:<span className='font-bold'> {book.release_year} </span></p>
              <div className='mb-4'>
                <input
                  type='text'
                  placeholder='New Title...'
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className='border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-cyan-500'
                />
                <button
                  onClick={() => updateTitle(book.id, book.release_year)}
                  className='bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500'
                >
                  Change
                </button>
              </div>
            </div>
            <button
              onClick={() => deleteBook(book.id)}
              className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
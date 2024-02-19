import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../components/modal';

const Books = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [dataBooks, setDataBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };


  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchBooks(token);
    }
  }, [token, navigate]);

  const fetchBooks = async (token) => {
    try {
      const url = 'http://localhost:8080/books/available';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener libros: ${response.statusText}`);
      }

      const result = await response.json();
      const books = result.books;

      setDataBooks(books);
      return books;
    } catch (error) {
      console.error('Error al obtener libros:', error.message);
      throw error;
    }
  };
  console.log(selectedBookId);
  const isData = dataBooks && Array.isArray(dataBooks) && dataBooks.length > 0;

  return (
    <div className='min-h-screen bg-black mt-0'>
      <div className="w-full flex flex-col items-center justify-center ">
        <h3 className="text-white text-base md:text-2xl lg:text-5xl">Available books</h3>
        {isData ?
          <table className="w-full text-white border border-white mt-8">
          <thead className="border border-white">
            <tr>
              <th className="border border-white md:text-xl lg:text-3xl">Title</th>
              <th className="border border-white md:text-xl lg:text-3xl">Author</th>
              <th className="border border-white md:text-xl lg:text-3xl">Action</th>
            </tr>
          </thead>
            {dataBooks.map(({ title, book_id, author, user_id}) => (
              <tbody>
                <tr key={book_id}>
                    <td onClick={() => {
                      setSelectedBookId(book_id)
                      openModal()}}
                      className="lg:w-2/5 text-white pl-2 lg:pl-8 border border-white md:text-xl lg:text-2xl"
                    >
                      {title}
                    </td>
                    <td
                      onClick={() => {
                        setSelectedBookId(book_id)
                        openModal(book_id)}}
                      className="text-white pl-3 lg:pl-8 border border-white md:text-xl lg:text-2xl">
                      {author}
                    </td>
                  <td className="text-white pl-3 lg:pl-8 border border-white md:text-xl lg:text-2xl">
                    {/* <button onClick={(e) => handleReservedClick(e, book_id, user_id)}>{loading? "loading" : "reserved"}</button> */}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          :
          <p className="text-white mt-2">you don't have reserved books</p>
        }
      </div>
        <div>
        {selectedBookId && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={dataBooks.find(book => book.book_id === selectedBookId).title}
            author={dataBooks.find(book => book.book_id === selectedBookId).author}
            userId={dataBooks.find(book => book.book_id === selectedBookId).userId}
            image_book={dataBooks.find(book => book.book_id === selectedBookId).image_book}
            description={dataBooks.find(book => book.book_id === selectedBookId).description}
          >
            {/* Otros detalles del libro */}
          </Modal>
        )}
        </div>
    </div>
  )
}

export default Books
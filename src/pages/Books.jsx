import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setAvailableBooks } from '../redux/slices/userBookSlice';

const Books = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector((store) => store.userBooks.availableBooks)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedBookId(null);
    }, 0);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (!token) {
          navigate('/');
        } else {
          const result = await fetchData(token);
          dispatch(setAvailableBooks({ availableBooks: result, isLoading: false }));
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchData = async (token) => {
      const url = 'http://localhost:8080/books/available';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching books: ${response.statusText}`);
      }

      const result = await response.json();
      return result.books;
    };

    if (!books || books.length === 0 ) fetchBooks();

  }, [token, navigate, dispatch, books]);

  const isData = books && Array.isArray(books) && books.length > 0;

  return (
    <div className='min-h-screen bg-black mt-0'>
      <div className='w-full flex flex-col items-center justify-center p-2 md:p-8 text-sm md:text-lg'>
        <h3 className='text-white text-base md:text-2xl lg:text-5xl'>Available books</h3>
        {isData ?
          <table className='w-full text-white border border-white mt-8'>
          <thead className='border border-white'>
            <tr>
              <th className='border border-white md:text-xl lg:text-3xl'>Title</th>
              <th className='border border-white md:text-xl lg:text-3xl'>Author</th>
              <th className='border border-white md:text-xl lg:text-3xl'>Action</th>
            </tr>
          </thead>
            {books.map(({ title, book_id, author }) => (
              <tbody>
                <tr key={book_id}>
                  <td onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBookId(book_id);
                    openModal(book_id)}}
                    className='lg:w-2/5 text-white pl-2 lg:pl-8 border border-white md:text-xl lg:text-2xl'
                  >
                    {title}
                  </td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBookId(book_id);
                      openModal(book_id);
                    }}
                    className='text-white pl-3 lg:pl-8 border border-white md:text-xl lg:text-2xl'>
                    {author}
                  </td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBookId(book_id);
                      openModal(book_id);
                    }}
                    className='text-white pl-3 lg:pl-8 border border-white md:text-xl lg:text-2xl hover:bg-blue-500 cursor-pointer'
                    >
                    Reserved

                    {selectedBookId ? (
                      <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        book_id={book_id}
                      />
                    ): ''}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          :
          <p className='text-white mt-2'>At this moment, there are no available books. Please try again later.</p>
        }
        <div className='w-full m-4 flex justify-end mt-8'>
          <button className='bg-blue-800 text-white w-[200px] md:w-[280px] h-8 rounded' onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default Books;

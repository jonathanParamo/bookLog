import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReservedBooks } from '../redux/slices/userBookSlice';
import { loadUserData } from '../redux/slices/thrunks';

const Modal = ({ isOpen, onClose, book_id }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const user_id = useSelector(( store ) => store.user.user.user_id);
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const [message, setMessage] = useState('');
  const books = useSelector((store) => store.userBooks.availableBooks);

  const findBook = (books, bookId) => {

    const findBook = books.find((book) => bookId === book.book_id);
    if (findBook) {
      return findBook;
    } else {
      return 'book not found';
    }
  }

  const bookFiltered = findBook(books, book_id)
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate, user_id]);

  const handleBookReserved = async (e, book_id, user_id,) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/books/${book_id}/reserve/${user_id}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setMessage( response.statusText);
      }

      const result = await response.json();
      const reservedBookInfo = result.reservedBookInfo;

      dispatch(setReservedBooks({ reservedBooks: [reservedBookInfo], isLoading: false }))

      loadUserData(user_id);

      function closeModal() {
        onClose();
      }
      setMessage('Book reserved!');
      closeModal();

      return reservedBookInfo;
    } catch (error) {
      setMessage(error);
    }
  };

  const { title, author, image_book, description, } = bookFiltered;

  function closeModal() {
    onClose();
  }

  return (
    <div className={`${modalClasses}`}>
      {isOpen && (
        <>
          <div
            className='fixed inset-0 bg-black bg-opacity-20'
            onClick={() => {
              if (isOpen) {
                onClose();
              }
            }}
            aria-hidden='true'
          />
          <div className='relative z-10 w-[800px] h-[650px] bg-white p-4 rounded-lg shadow-md w-96 overflow-auto'>
            <div className='flex  flex-col justify-between items-center mb-4'>
              <p className='text-2xl'>Title:</p>
              <h2 className='text-2xl font-bold'>{title}</h2>
              <p className='text-gray-600 text-xl'>Author:</p>
              <p className='text-gray-600 text-xl'>{author}</p>
            </div>
            <div className='w-full flex justify-between p-4'>
              <p className='w-2/3 text-black'>{description}</p>
              <img
                src={image_book}
                alt={260}
                className='w-[320px] h-[240px] object-cover h-48 w-96 mt-4 rounded-md'
              />
            </div>
            <div className='w-full h-28 flex flex-row justify-between'>
              <button className='w-80 h-8 mt-6 text-white hover:text-gray-700 bg-blue-500' onClick={() => closeModal}>
                Close
              </button>
              <button
                onClick={(e) => handleBookReserved(e, book_id, user_id, token,)}
                className='w-80 h-8 mt-6 text-white hover:text-gray-700 bg-blue-500'
              >
                Reserve
              </button>

            </div>
            {message && <p className='w-full text- center text-black'>{message}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateBook, setReservedBooks } from '../redux/slices/userBookSlice';
import { loadUserData } from '../redux/slices/thrunks';

const Modal = ({ isOpen, onClose, book_id }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const user_id = useSelector(( store ) => store.user.user.user_id);
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const [message, setMessage] = useState('');
  const [titleBook, setTitleBook] = useState('');
  const [authorBook, setAuthorBook] = useState('');
  const [imageBook, setImageBook] = useState('');
  const [createBookDescription, setCreateBookDescription] = useState('');
  const [categoryBook, setCategoryBook] = useState('');
  const books = useSelector((store) => store.userBooks.availableBooks);
  const imageCreatBook = 'https://uploads-ssl.webflow.com/5e86c7170f1ab21474c3f2a4/5efc63ccabeea' +
    '75f2be217c1_26227250_1794507963934400_6671023133488578560_n.jpg'

  const findBook = (books, bookId) => {
    const findBook = books.find((book) => bookId === book.book_id);
    if (findBook) {
      return findBook;
    } else {
      return 'book not found';
    }
  };

  const bookFiltered = findBook(books, book_id);

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

      dispatch(setReservedBooks({ reservedBooks: [reservedBookInfo], availableBooks: [reservedBookInfo]}));

      loadUserData(user_id);

      function closeModal() {
        onClose();
      };

      setMessage('Book reserved!');
      closeModal();

      return reservedBookInfo;
    } catch (error) {
      const errorMessage = error.message || 'An error occurred.';
      setMessage(errorMessage);
    }
  };

  const handleCreateBook = async (e, user_id, titleBook, imageBook, createBookDescription, authorBook, categoryBook) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/books/create/${user_id}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleBook,
          imageBook: imageBook,
          description: createBookDescription,
          author: authorBook,
          category: categoryBook,
        }),
      });
      if (!response.ok) {
        setMessage( response.statusText);
      }
      const result = await response.json();

      const bookCreated = result.createdBook;

      dispatch(setCreateBook({ availableBooks: [bookCreated] }))

      function closeModal() {
        onClose();
      };
      closeModal();
    } catch (error) {
      const errorMessage = error.message || 'An error occurred.';
      setMessage(errorMessage);
    }
  }

  const { title, author, image_book, description, } = bookFiltered;

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
          <div className='relative z-10 w-4/5 lg:w-3/5 h-[650px] bg-white p-4 rounded-lg shadow-md overflow-auto'>
              <div className='flex flex-col justify-between items-center m-4'>
                {book_id ?
                  <h2 className='text-2xl font-bold text-black'>{title.toUpperCase()}</h2>
                  :
                  <h2 className='text-2xl font-bold text-black'>Create Book</h2>
                }
                {!book_id &&
                  <section className='w-full flex flex-col items-center md:mt-6'>
                    <img
                      src={imageBook || imageCreatBook}
                      alt='Imagecreatebook'
                      className='w-32 h-32 rounded'
                    />
                    <seccion className='w-full mt-8 flex justify-between items-center px-8'>
                      <label htmlFor='title' className='text-lg'>Title:</label>
                      <input
                        type='text'
                        id='title'
                        placeholder='Title'
                        onChange={(e) => setTitleBook(e.target.value)}
                        className='w-2/3 mb-4 p-2  border border-stone-950 rounded-md focus:outline-none'
                      />
                    </seccion>
                  </section>
                }
                {book_id ?
                  <>
                    <p className='text-gray-600 text-xl'>Author:</p>
                    <p className='text-gray-600 text-xl'>{author}</p>
                  </>
                  :
                  <section className='w-full mt-2 flex justify-between items-center px-8'>
                    <label htmlFor='author' className='text-lg'>Author:</label>
                    <input
                      type='text'
                      id='author'
                      placeholder='Author'
                      onChange={(e) => setAuthorBook(e.target.value)}
                      className='w-2/3 mb-4 p-2  border border-stone-950 rounded-md focus:outline-none'
                    />
                  </section>
                }
              </div>
              {book_id ?
                <div className='w-full flex justify-between p-4 h-9/12 pr-6 pl-6'>
                  <p className='w-2/3 text-black p-2 mt-4'>Desciption: <br className='mb-2'/>{description}</p>
                  <img
                    src={image_book}
                    alt={260}
                    className='w-[320px] h-[240px] md:w-[300px] md:h-[370px] mt-4 rounded-md p-2 border-2 border-blue-500 bg-blue-500'
                  />
                </div>
                :
                <section className='w-full mt-2 flex justify-between items-center px-12'>
                  <label htmlFor='image'>Image</label>
                  <input
                    type='text'
                    id='image'
                    placeholder='Link image'
                    onChange={(e) => setImageBook(e.target.value)}
                    className='w-2/3 mb-4 p-2  border border-stone-950 rounded-md focus:outline-none'
                  />
                </section>
              }
              {!book_id &&
                <section className='w-full mt-2 flex justify-between items-center px-12 '>
                  <label htmlFor='description'>Description:</label>
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="3"
                    onChange={(e) => setCreateBookDescription(e.target.value)}
                    className='w-2/3 mb-4 p-2  border border-stone-950 rounded-md resize-none focus:outline-none'
                  />
                </section>
              }
              {!book_id &&
                <section className='w-full mt-2 flex justify-between items-center px-12'>
                  <label htmlFor='category' className='text-lg'>Category:</label>
                  <input
                    type='text'
                    id='category'
                    placeholder='Category'
                    onChange={(e) => setCategoryBook(e.target.value)}
                    className='w-2/3 mb-4 p-2  border border-stone-950 rounded-md focus:outline-none'
                  />
                </section>
              }
              <div className='w-full h-18 flex flex-row justify-between px-12'>
                <button
                  className='w-4/12 md:w-2/5 h-8 mt-6 text-white bg-red-500 rounded hover:bg-red-700'
                  onClick={() => onClose()}
                >
                  Close
                </button>
                <button
                  onClick={(e) => {
                    if (book_id) {
                      handleBookReserved(e, book_id, user_id, token,)
                    } else {
                      handleCreateBook(e, user_id, titleBook, imageBook, createBookDescription, authorBook, categoryBook)
                    }
                  }}
                  className='w-4/12 h-8 md:w-2/5 mt-6 text-white bg-blue-500 rounded hover:bg-blue-700'
                >
                  {book_id ? 'Reserve' : 'Create Book'}
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

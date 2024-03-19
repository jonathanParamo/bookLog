import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { returnBook } from '../redux/slices/thrunks';
import { loadUserData } from '../redux/slices/thrunks';
import Modal from '../components/Modal';
import Table from '../components/Table';
import Message from '../components/Message';

const UserProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const dataUser = useSelector(( store ) => store.user);
  const reservedBooks = useSelector((store) => store.userBooks.reservedBooks);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const noImgageProfile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:'+
  'ANd9GcQfSZK21IXaEpBtXBE4-99_n0PzaYw4ZJS1oRpbEhCtFJkdbb9j1bgP_VvVGL_bb4iDKoU&usqp=CAU';

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    loadUserData(user_id)

    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [token, navigate, message]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 0);
  };

  const handleReturnBook = async (e, book_id, user_id, token) => {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(returnBook({book_id, user_id, token}));
    try {
      if (result.data.success) {
        setMessage('Book as returned successfully');
        loadUserData(user_id);
      } else {
        const errorMessage = result.error || 'Error returning the book';
        setMessage(`Error: ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error returning the book';

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const { username, profile_image, user_id } = dataUser.user;
  const isData = dataUser && dataUser.user && reservedBooks && reservedBooks.length > 0 &&
    reservedBooks.some(book => book.title !== null && book.author !== null && book.book_id !== null);

  const matchUsedId = user_id === 2;
  const dataReservedBooks = reservedBooks[0]?.title === null;

  return (
    <div className='min-h-screen bg-black flex xs:flex-col md:flex-row p-4 md:p-8'>
      <div className='w-full md:w-4/12 sm:h-52 md:h-auto flex flex-row md:flex-col
        justify-between rounded md:mr-2 md:p-2'
      >
        <div className='w-36 md:w-full flex flex-col grid md:p-2 md:bg-[#f5f5f515]'>
          <img
            className='hidden md:block w-full rounded'
            src={profile_image || noImgageProfile}
            alt='UserProfile'
          />
          <p className='text-white text-sm md:text-2xl lg:text-4xl md:my-2'>Username: {username}</p>
          <p className='text-white text-sm md:text-2xl lg:text-4xl md:my-2'>
            My reservations: {dataReservedBooks ? 0 : reservedBooks.length}
          </p>
          {matchUsedId &&
            <button
              className='w-full h-8 md:h-12 my-2 text-white border border-cyan-400
              duration-500 hover:bg-cyan-800 hover:text-cyan-200 rounded hover:border-cyan-300 mb-6 md:text-2xl'
              onClick={() => openModal(true)}
            >
              Create Book
            </button>
          }
        </div>
        <img
          className='md:hidden w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] h-[150px] rounded'
          src={profile_image || noImgageProfile}
          alt='UserProfile'
        />
      </div>
      <div className='w-full md:w-8/12 h-auto mt-4 flex flex-col items-center'>
        <h3 className='text-white text-base md:text-2xl lg:text-5xl'>My reserves</h3>
        {isData ?
          <table className='w-full text-white mt-8 border border-[#f5f5f580]'>
            <thead className='bg-[#f5f5f520]'>
              <tr>
                <th className='border border-white md:text-xl lg:text-2xl'>Title</th>
                <th className='border border-white md:text-xl lg:text-2xl'>Author</th>
                <th className='border border-white md:text-xl lg:text-2xl'>Action</th>
              </tr>
            </thead>
              {reservedBooks.map(({ title, book_id, author, user_id }) => (
                <Table
                  key={book_id}
                  title={title}
                  book_id={book_id}
                  author={author}
                  user_id={user_id}
                  onClick={(e) => handleReturnBook(e, book_id, user_id, token)}
                  token={token}
                  loading={loading}
                  buttonText={loading ? 'Loading' : 'Return'}
                />
              ))}
          </table>
          :
          <p className='text-white mt-2'>you don't have reserved books</p>
        }
        <section className='w-full flex justify-end'>
          <button
            className='
              text-white w-[180px] md:w-[280px] h-8 md:h-10 rounded border border-blue-700 duration-500 hover:border-blue-400
              hover:text-blue-400 mt-6
              '
            onClick={() => navigate('/books')}
          >
            Books
          </button>
        </section>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      {message && <Message message={message}/>}
    </div>
  )
}

export default UserProfile;
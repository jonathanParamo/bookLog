import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { returnBook } from '../redux/slices/thrunks';
import { loadUserData } from '../redux/slices/thrunks';
import Modal from '../components/Modal';
import Table from '../components/Table';

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
  }, [token, navigate]);

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
    console.log(result, "result");

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

  return (
    <div className='min-h-screen bg-black flex flex-col p-4 md:p-8'>
      <div className='w-full h-52 md:h-72 flex flex-row justify-between'>
        <div className='w-36 md:w-72 lg:w-1/3 flex flex-col'>
          <p className='text-white text-base md:text-2xl lg:text-5xl'>Username: {username}</p>
          <p className='text-white text-base md:text-2xl lg:text-5xl'>My reservations: {reservedBooks ? reservedBooks.length : 0}</p>
          {matchUsedId &&
            <button
              className='w-80 h-8 md:w-3/5 mt-2 text-black bg-cyan-500 rounded hover:bg-cyan-600'
              onClick={() => openModal(true)}
            >
              Create Book
            </button>
          }
        </div>
        <img
          className='w-[190px] md:w-[280px] h-[190px] md:h-[280px] rounded'
          src={profile_image || noImgageProfile}
          alt='UserProfile'
        />
      </div>
      <div className='w-full mt-4 flex flex-col items-center justify-center '>
        <h3 className='text-white text-base md:text-2xl lg:text-5xl'>My reserves</h3>
        {isData ?
          <table className='w-full text-white border border-white mt-8'>
          <thead className='border border-white'>
            <tr>
              <th className='border border-white md:text-xl lg:text-3xl'>Title</th>
              <th className='border border-white md:text-xl lg:text-3xl'>Author</th>
              <th className='border border-white md:text-xl lg:text-3xl'>Action</th>
            </tr>
          </thead>
            {reservedBooks.map(({ title, book_id, author, user_id }) => (
              <Table
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
      </div>
      <div className='w-full flex justify-end mt-8'>
        <button
          className='bg-blue-600 text-white w-[200px] md:w-[280px] h-8 rounded transition delay-300 hover:bg-blue-900'
          onClick={() => navigate('/books')}
        >
          Books
        </button>
      </div>
      {isModalOpen ? (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      ): ''}
      {message && <p className='text-black'>{message}</p>}
    </div>
  )
}

export default UserProfile;
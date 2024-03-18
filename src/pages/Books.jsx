import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setAvailableBooks } from '../redux/slices/userBookSlice';
import Table from '../components/Table';

const Books = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector((store) => store.userBooks.availableBooks);
  const [getBooks, setGetBooks] = useState(false);

  const fetchCategoryBooks = async (selectedValue, token) => {
    const url = process.env.REACT_APP_SERVER + "books/category/" + selectedValue;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${token}`,
        'contet-type': 'application/json'
      },
    });

    if(!response.ok) {
      throw new Error('Error fetching books category');
    }

    const result = await response.json();
    return result.categoryBooks
  }

  const categoryBooks = async (selectedValue) => {
    const result = await fetchCategoryBooks(selectedValue, token)
    dispatch(setAvailableBooks({ availableBooks: result, isLoading: false }));

  }

  const handleChange = (event) => {
    categoryBooks(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedBookId(null);
    }, 0);
  };

  const handleChangeBooks = () => {
    setGetBooks(true);
  }

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
      const url = process.env.REACT_APP_SERVER +'books/available';
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

    if (Array.isArray(books) && books.length === 0) fetchBooks();

    if (getBooks === true) {
      fetchBooks();
      setGetBooks(false);
    }
  }, [token, navigate, dispatch, books, getBooks]);

  const isData = books && Array.isArray(books) && books.length > 0;

  return (
    <div className='min-h-screen bg-black mt-0'>
      <div className='w-full flex flex-col items-center justify-center p-2 md:p-8 text-sm md:text-lg'>
        <h3 className='text-white text-base md:text-2xl lg:text-5xl'>Available books</h3>
        <seccion
          className='w-full flex justify-end bg-black mt-2 md:mt-6'
        >
          <seccion className='border border-blue-600 p-1 rounded'>
            <select className='text-white bg-black w-[200px] md:w-[240px] border-none focus:outline-none'
              name='Books' id='books'  onChange={handleChange}
            >
              <option>Book category</option>
              <option value='coming-of-age'>Coming of age</option>
              <option value='love'>Love</option>
              <option value='science-fiction'>Science fiction</option>
              <option value='fantasy'>Fantasy</option>
              <option value='epic-fantasy'>Epic fantasy</option>
              <option value='mistery-and-suspense'>Mistery/Suspense</option>
            </select>
          </seccion>
        </seccion>

        {isData ?
          <table className='w-full text-white border mt-8'>
          <thead className='border border-[#f5f5f590] bg-[#f5f5f517]'>
            <tr>
              <th className='md:text-xl lg:text-3xl text-start pl-2 lg:pl-8'>Title</th>
              <th className='md:text-xl lg:text-3xl text-start pl-2 lg:pl-8'>Author</th>
              <th className='md:text-xl lg:text-3xl text-start pl-2 lg:pl-8'>Action</th>
            </tr>
          </thead>
            {books.map(({ title, book_id, author }) => (
              <>
                <Table
                  key={book_id}
                  title={title}
                  book_id={book_id}
                  author={author}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBookId(book_id);
                    openModal(book_id)
                  }}
                  buttonText='Reserved'
                />
                {selectedBookId ? (
                  <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    book_id={selectedBookId}
                  />
                ): ''}
              </>
            ))}
          </table>
          :
          <p className='text-white mt-2'>At this moment, there are no available books. Please try again later.</p>
        }
        <div className='w-full m-4 flex justify-end mt-8'>
          <button
            className='bg-sky-600 text-white w-[200px] md:w-[280px] h-8 rounded mr-4 transition delay-300 hover:bg-sky-900'
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            className='bg-blue-600 text-white w-[200px] md:w-[280px] h-8 rounded transition delay-300 hover:bg-blue-900'
            onClick={() => handleChangeBooks()}
          >
            Available books
          </button>
        </div>
      </div>
    </div>
  )
}

export default Books;

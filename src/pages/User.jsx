import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { returnBook } from "../redux/slices/thrunks";

const UserProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const dataUser = useSelector(( store ) => store.userBooks);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const noImgageProfile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:'+
  'ANd9GcQfSZK21IXaEpBtXBE4-99_n0PzaYw4ZJS1oRpbEhCtFJkdbb9j1bgP_VvVGL_bb4iDKoU&usqp=CAU'

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token, navigate])

  console.log(token);

  const handleReturnClick = async (e, book_id, user_id) => {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(returnBook({book_id, user_id, token}));

    try {
      if (result.data.success) {
        setMessage("Book as returned successfully");
      } else {
        const errorMessage = result.error || "Error returning the book";
        setMessage(`Error: ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error returning the book";

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const { username,profile_image } = dataUser.userSignin;
  const { reserved_books } = dataUser.userSignin;
  const isData = dataUser && dataUser.userSignin && reserved_books && reserved_books.length > 0 &&
    reserved_books.some(book => book.title !== null && book.author !== null && book.book_id !== null);


  return (
    <div className="min-h-screen bg-black flex flex-col p-4 md:p-8">
      <div className="w-full h-64 flex flex-row justify-between">
        <div className="w-36 md:w-72 lg:w-1/3 flex flex-col">
          <p className="text-white text-base md:text-2xl lg:text-5xl">Username: {username}</p>
          <p className="text-white text-base md:text-2xl lg:text-5xl">My reservations: {reserved_books ? reserved_books.length : 0}</p>
        </div>
        <img
          src={profile_image || noImgageProfile}
          alt="Perfil del usuario"
        />
      </div>
      <div className="w-full mt-4 flex flex-col items-center justify-center ">
        <h3 className="text-white text-base md:text-2xl lg:text-5xl">My reserves</h3>
        {isData ?
          <table className="w-full text-white border border-white mt-8">
          <thead className="border border-white">
            <tr>
              <th className="border border-white md:text-xl lg:text-3xl">Title</th>
              <th className="border border-white md:text-xl lg:text-3xl">Author</th>
              <th className="border border-white md:text-xl lg:text-3xl">Action</th>
            </tr>
          </thead>
            {reserved_books.map(({ title, book_id, author, user_id}) => (
              <tbody>
                <tr key={book_id}>
                  <td className="lg:w-2/5 text-white pl-2 lg:pl-8 border border-white md:text-xl lg:text-2xl">{title}</td>
                  <td className="text-white pl-3 lg:pl-8 border border-white md:text-xl lg:text-2xl">{author}</td>
                  <td className="text-white pl-3 lg:pl-8 border border-white md:text-xl lg:text-2xl">
                    <button onClick={(e) => handleReturnClick(e, book_id, user_id)}>{loading? "loading" : "return"}</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          :
          <p className="text-white mt-2">you don't have reserved books</p>
        }
      </div>
      <div className="w-full flex justify-end mt-8">
        <button className="text-white" onClick={() => navigate('/books')}>Books</button>
      </div>
      {message && <p className="text-whitte">{message}</p>}
    </div>
  )
}

export default UserProfile;
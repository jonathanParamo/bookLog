const backgound = {
  blue : 'hover:bg-blue-800',
  red : 'hover:bg-red-800'
}

const Table = ({
  title,
  book_id,
  author,
  onClick,
  buttonText
}) => {
  return (
    <tbody>
      <tr key={book_id}>
        <td className='lg:w-2/5 text-white pl-2 lg:pl-8 border border-white text-xs md:text-xl'>{title}</td>
        <td className='text-white pl-3 lg:pl-8 border border-white text-xs md:text-xl lg:text-2xl'>{author}</td>
        <td className={`
          text-white pl-3 lg:pl-8 border border-white text-xs md:text-xl lg:text-2xl
          ${buttonText === 'Return' ? backgound.red : backgound.blue} cursor-pointer`}>
          <button
            onClick={onClick}
          >
              {buttonText}
          </button>
        </td>
      </tr>
    </tbody>
  )
}

export default Table;
const Modal = ({ isOpen, onClose, title, author, image_book, description }) => {
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';

  return (
    <div className={`${modalClasses}`}>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-20"
            onClick={onClose}
            aria-hidden="true"
          ></div>
          <div className="w-[800px] h-[650px] bg-white p-4 rounded-lg shadow-md w-96">
            <div className="flex  flex-col justify-between items-center mb-4">
              <p className="text-2xl">Title:</p>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-gray-600 text-xl">Author:</p>
              <p className="text-gray-600 text-xl">{author}</p>
            </div>
            <div className="w-full flex justify-between p-4">
              <p className="w-2/3">{description}</p>
              <img
                src={image_book}
                alt={260}
                className="w-[320px] h-[240px] object-cover h-48 w-96 mt-4 rounded-md"
              />
            </div>
            <div className="w-full flex justify-center">
              <button className="w-80 h-8 mt-6 text-white hover:text-gray-700 bg-blue-500" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;

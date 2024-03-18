import { useState, useEffect } from "react"

const Message = ({ message }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="fixed bottom-4 right-4 bg-black border border-gray-300 p-2 rounded-lg shadow-lg z-50 flex items-center justify-between">
      <p className="text-white text-base">{message}</p>
    </div>
  )
}

export default Message
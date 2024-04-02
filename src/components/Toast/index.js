import { useState, useEffect } from "react";

const Toast = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!message) return;
    setShow(true);
    const timeout = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div
      className={`fixed top-20 right-0 transform -translate-x-1/2 bg-${type}-500 text-white px-4 py-2 rounded-md shadow-lg transition duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;

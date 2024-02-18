import React, { useState } from 'react';
import ErrorModal from './UI/ErrorModel';

function FetchRenderTest() {
  const [isError, setIsError] = useState(false);
  const errorHandler = () => {
    setIsError(false);
  };

  const confirmHandler = async () => {
    let domain = window.location.hostname;
    try {
      const response = await fetch('https://65d1ac70987977636bfb57a9.mockapi.io/api/v1/test', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ SendData: 'test' }),
      });

      if (response.status === 200) {
        return;
      } else {
        setIsError(true);
        return;
      }
    } catch (error) {
      setIsError(true);
    }
  };
  return (
    <>
      {isError && (
        <ErrorModal
          role="dialog"
          title="Modal, Dialog Test"
          message=""
          onConfirm={errorHandler}
        />
      )}
      <div>
        <button onClick={confirmHandler}> Testing Start</button>
      </div>
    </>
  );
}

export default FetchRenderTest;

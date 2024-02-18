import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './ErrorModal.module.css';

const ErrorModalOverlay = (props) => {
  return (
    <div className={classes.backdrop}>
      <div className={classes.container}>
        <section>
          <header className={classes.header}>
            <h2>{props.title}</h2>
          </header>
          <div className={classes.content}>
            <p>{props.message}</p>
          </div>
          <footer className={classes.footer}>
            <button className={classes.button} onClick={props.isConfirm}>
              Error dialog close
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');
const ErrorModal = (props) => {
  const { title, message, onConfirm } = props;
  if (!portalElement) {
    return null;
  }
  const messageText = message ? message.result : null;
  const errorModalElements = ReactDOM.createPortal(
    <ErrorModalOverlay
      title={title}
      message={messageText}
      isConfirm={onConfirm}
    ></ErrorModalOverlay>,
    portalElement
  );

  return <Fragment>{errorModalElements}</Fragment>;
};

export default ErrorModal;

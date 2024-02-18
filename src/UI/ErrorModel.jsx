import React, { Fragment, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./ErrorModal.module.css";

const ErrorModalOverlay = (props) => {
	return (
		<div className={classes.backdrop} role="dialog">
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
const ErrorModal = (props) => {
	const modalRoot = useRef(document.createElement("div"));
	useEffect(() => {
		let root = document.getElementById("overlays");
		/**
		 * this is for testing
		 */
		if (!root) {
			root = document.createElement("div");
			root.setAttribute("id", "overlays");
			document.body.appendChild(root);
		}

		root.appendChild(modalRoot.current);

		return () => {
			root.removeChild(modalRoot.current);
		};
	}, []);
	const { title, message, onConfirm } = props;
	const messageText = message ? message.result : null;
	const errorModalElements = ReactDOM.createPortal(
		<ErrorModalOverlay
			title={title}
			message={messageText}
			isConfirm={onConfirm}></ErrorModalOverlay>,
		modalRoot.current
	);

	return <Fragment>{errorModalElements}</Fragment>;
};

export default ErrorModal;

import React, {Fragment} from 'react';
import ReactDom from 'react-dom';

import styles from './Modal.module.css';
import Card from '../Layout/Card';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseCart}></div>
}

const ModalCart = (props) => {
  return (
    <Card className={`${styles.modal} ${styles.className}`}>
      {props.children}
    </Card>
  )
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, document.getElementById('backdrop'))}
      {ReactDom.createPortal(<ModalCart>{props.children} </ModalCart>, document.getElementById('modal'))}
    </Fragment>
  )
}

export default Modal;
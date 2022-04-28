import {Fragment} from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

function Backdrop(props){
    return <div onClose={props.onClose} className={classes.backdrop}/>

}
const ModalOverlay = (props) =>{
    return <div className={classes.modal}>
     <div className={classes.content}>{props.children} </div>
    </div>
}
const portalElement = document.getElementById('overlays')

const Modal = (props) =>{
    return  <Fragment>
           {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
           {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
            </Fragment>
            
    
}
export default Modal;
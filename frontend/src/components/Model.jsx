


const Modal = ({ children }) => {
    return (
        <div className = "fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            {children}
        </div> 
    );
};

export default Modal;
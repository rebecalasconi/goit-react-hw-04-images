import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import './styles.css';

function Modal({ largeImageURL, onClose }) {
    // Funcția de închidere cu "Escape" - configurată în useEffect
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        // Adaugă evenimentul de keydown când componenta se montează
        window.addEventListener('keydown', handleKeyDown);

        // Înlătură evenimentul de keydown când componenta se demontează
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // Funcția de închidere prin click pe overlay
    const handleOverlayClick = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="Overlay" onClick={handleOverlayClick}>
            <div className="Modal">
                <img src={largeImageURL} alt="" />
            </div>
        </div>
    );
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
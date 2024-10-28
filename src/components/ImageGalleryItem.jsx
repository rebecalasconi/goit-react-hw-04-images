import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ImageGalleryItem = ({ image, onClick }) => (
    <li className="ImageGalleryItem" onClick={() => onClick(image.largeImageURL)}>
      <img src={image.webformatURL} alt={image.tags}  className="ImageGalleryItem-image" />
    </li>
  );


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
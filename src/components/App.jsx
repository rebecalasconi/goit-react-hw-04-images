import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Hourglass } from 'react-loader-spinner';
import Button from './Button';
import Modal from './Modal';
import './styles.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Funcția pentru a căuta imagini folosind API-ul
  const fetchImages = useCallback(async () => {
    if (!searchQuery) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=45694916-26d3469d9465de46d8eb67fae&image_type=photo&orientation=horizontal&per_page=12`);
      setImages((prevImages) => [...prevImages, ...response.data.hits]);
      setTotalHits(response.data.totalHits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, page]);

  // Încarcă imagini când se schimbă query-ul de căutare sau pagina
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Derulează pagina în jos când se încarcă noi imagini
  useEffect(() => {
    if (images.length > 0 && page > 1) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [images, page]);


  // Gestionează submit-ul din Searchbar
  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  // Funcția care deschide modalul când se dă click pe o imagine
  const handleImageClick = (largeImageURL) => {
    setSelectedImage(largeImageURL);
    setShowModal(true);
  };

  // Funcția care închide modalul
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const isVisible = images.length > 0 && images.length < totalHits;

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      )}
      {isVisible && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal largeImageURL={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default App;
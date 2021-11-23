import React, { ReactElement } from 'react';
import { ReactComponent as Left } from '../../assets/left.svg';
import { ReactComponent as Right } from '../../assets/right.svg';
import './styles/index.css';

interface IGallery {
  img: string | undefined
  setGallery: React.Dispatch<React.SetStateAction<boolean>>
  currentGallery: number
  setCurrentGallery: React.Dispatch<React.SetStateAction<number>>
  imgCount: number
}

function Gallery({
  img, setGallery, currentGallery, setCurrentGallery,
  imgCount,

}:IGallery):ReactElement {
  return (
    <div
      id="gallery"
      aria-hidden="true"
      onClick={() => setGallery(false)}
    >
      <div
        id="left"
        aria-hidden="true"
        onClick={
        (e) => {
          e.stopPropagation();
          if (currentGallery !== 0) {
            setCurrentGallery(currentGallery - 1);
          }
        }
      }
      >
        <Left />
      </div>
      <div className="galleryArea">
        <div className="removeGallery">
          X
        </div>
        <img
          aria-hidden="true"
          onClick={(e) => e.stopPropagation()}
          className="one_gallery_image"
          src={img}
          alt="teeth"
        />
      </div>
      <div
        id="right"
        aria-hidden="true"
        onClick={
        (e) => {
          e.stopPropagation();
          if (currentGallery < imgCount - 1) {
            setCurrentGallery(currentGallery + 1);
          }
        }
      }
      >
        <Right />
      </div>
    </div>
  );
}

export default Gallery;

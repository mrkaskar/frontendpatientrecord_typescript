/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ReactComponent as Add } from './assets/add.svg';
import { ReactComponent as Left } from './assets/left.svg';
import { ReactComponent as Right } from './assets/right.svg';
import './styles/index.css';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';

function Image():ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const [images, setImages] = React.useState<ImageListType>([]);
  const [gallery, setGallery] = React.useState(false);
  const [currentGallery, setCurrentGallery] = React.useState(0);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ):void => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <div>
      {
        gallery
        && (
        <div id="gallery">
          <div id="left">
            <Left
              style={{
                filter: `${theme === 'dark' && 'invert(100%) sepia(0%) saturate(8%) hue-rotate(236deg) brightness(104%) contrast(105%)'}`,
              }}
            />
          </div>
          <div id="gallery_image">
            <img className="one_gallery_image" src={images[currentGallery].dataURL} alt="teeth" />
          </div>
          <div id="right">
            <Right
              style={{
                filter: `${theme === 'dark' && 'invert(100%) sepia(0%) saturate(8%) hue-rotate(236deg) brightness(104%) contrast(105%)'}`,
              }}
            />
          </div>
        </div>
        )
      }
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={10}
      >
        {
          ({
            imageList,
            onImageUpload,
            dragProps,
            isDragging,
          }) => (
            <div id="images_list_area">
              <div id="images">
                {
                  imageList.map((img) => (
                    <div
                      aria-hidden="true"
                      onClick={() => setGallery((prev) => !prev)}
                      className="unique_image"
                      key={Math.random()}
                    >
                      <img className="one_image" src={img.dataURL} alt="teeth" />
                    </div>
                  ))
                }
                <div
                  {...dragProps}
                  aria-hidden="true"
                  onClick={onImageUpload}
                  id="image_area"
                  style={{
                    backgroundColor: isDragging ? '#76DC9F45'
                      : colors.inputback[theme],
                  }}
                >
                  <Add />
                </div>
              </div>
            </div>
          )
        }
      </ImageUploading>
    </div>
  );
}

export default Image;

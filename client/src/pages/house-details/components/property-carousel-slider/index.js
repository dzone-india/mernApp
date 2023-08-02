import React from 'react';
import {Box} from "@material-ui/core";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider1.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider1.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider2.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider2.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider3.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider3.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider4.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider4.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider5.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider5.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider6.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider6.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider7.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider7.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider8.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider8.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider9.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider9.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
  {
    original: 'https://dzoneist.com/vishal-final/images/detail_slider10.jpg',
    thumbnail: 'https://dzoneist.com/vishal-final/images/detail_slider10.jpg',
    description: "VSHAL YASHIKA HEAVENS"
  },
];

const CarouselSlider = (props) => {
  const images = props.images || [];
  return (
    <>
      <Box className="property-detail-gallery">
        <ImageGallery
          items={images}
          additionalClass="property-image-gallery"
          showBullets={false}
          showThumbnails={true}
        />
      </Box>
    </>
  );
};

export default CarouselSlider;
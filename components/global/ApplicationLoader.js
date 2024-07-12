import React from 'react';
import Loader from '../../public/images/loader.svg';
import LoaderMobile from '../../public/images/tail-spin-loader.svg';

export default function ApplicationLoader({ width, height, ...props }) {
  return (
    <>
      <Loader
        style={{ width, height, ...props }}
        className="my-auto mx-auto hidden lg:block"
      />
      <LoaderMobile
        style={{ width, height, ...props }}
        className="my-auto mx-auto fill-grey-800 lg:hidden"
      />
    </>
  );
}

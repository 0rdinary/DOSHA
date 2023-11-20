import React from 'react';

import Spinner from '../assets/Spinner.gif';
import '../styles/Loading.scss';

export default function () {
  return (
    <div className="loadingBackground">
      <img src={Spinner} alt="로딩중" />
    </div>
  );
}

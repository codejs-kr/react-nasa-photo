import React from 'react';
import styles from './Viewer.scss';
import classNames from 'classnames/bind';
import { DoubleBounce } from 'better-react-spinkit'
const cx = classNames.bind(styles);

const Viewer = ({mediaType, url, title, date, loading, handleHiddenLoader}) => {
  if (!url) {
    return null;
  }

  let loaderEl = <DoubleBounce className={cx('loader')} color="white" size={100} />;
  if (!loading) {
    loaderEl = '';
  }

  return (
    <div className={cx('viewer')}>
      {
        mediaType === 'image' ? (
          <img
            src={url}
            onLoad={() => handleHiddenLoader()}
            onClick={() => window.open(url)}
            alt="space"
          />
        ) : (
          <iframe
            src={url}
            onLoad={() => handleHiddenLoader()}
            title="space-video"
            frameBorder="0"
            allowFullScreen
          />
        )
      }
      <p className={cx('title')}>
        {title}
        <br/>
        <span>{date}</span>
      </p>

      {loaderEl}
    </div>
  );
};

export default Viewer;

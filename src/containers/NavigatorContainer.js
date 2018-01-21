import React, { Component } from 'react';
import Viewer from 'components/Viewer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apodActions from 'store/modules/apod';

class ViewerContainer extends Component {
  req = null;

  getApod = async () => {
    const { ApodActions, loading, date } = this.props;
    loading && this.req.cancel(); // 로딩중이라면 취소하기

    try {
      // this.req 에 Promise 담기
      this.req = ApodActions.getApod(date || '');
      console.log('확인', this.props.url);

      await this.req; // 끝날 때 까지 대기
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getApod();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.date !== prevProps.date) {
      this.getApod();
    }
  }

  render() {
    const { date, url, title, mediaType, loading } = this.props;

    return (
      <Viewer
        date={date}
        url={url}
        title={title}
        mediaType={mediaType}
        loading={loading}
      />
    );
  }
}

export default connect(
  ({ apod }) => ({
    date: apod.date,
    url: apod.url,
    title: apod.title,
    mediaType: apod.mediaType,
    loading: apod.loading
  }),
  (dispatch) => ({
    ApodActions: bindActionCreators(apodActions, dispatch)
  })
)(ViewerContainer);
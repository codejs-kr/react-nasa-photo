import React, { Component } from 'react';
import Viewer from 'components/Viewer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apodActions from 'store/modules/apod';

class ViewerContainer extends Component {
  getApod = async () => {
    const { ApodActions, date } = this.props;

    try {
      ApodActions.getApod(date || '');
    } catch (e) {
      console.log(e);
    }
  };

  handleHiddenLoader = () => {
    const { ApodActions } = this.props;

    ApodActions.hideLoader();
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
    const { handleHiddenLoader } = this;

    return (
      <Viewer
        date={date}
        url={url}
        title={title}
        mediaType={mediaType}
        loading={loading}
        handleHiddenLoader={handleHiddenLoader}
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
import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';
import * as api from './lib/api';
import moment from 'moment';

class App extends Component {
  state = {
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    title: null,
    mediaType: null
  };

  getAPOD = async (date) => {
    // 이미 요청중이라면 무시
    if (this.state.loading) {
      return;
    }

    // 로딩 상태 시작
    this.setState({
      loading: true
    });

    try {
      const response = await api.getAPOD(date);
      console.log('Response', response);

      // 비구조화 할당 + 새로운 이름
      const { date: retrievedDate, media_type: mediaType, url, title } = response.data;
      console.log('retrievedDate', retrievedDate, url, mediaType);

      // 만약에 maxDate 가 없으면 지금 받은 date 로 지정
      if (!this.state.maxDate) {
        this.setState({
          maxDate: retrievedDate
        })
      }

      // 전달받은 데이터 넣어주기
      this.setState({
        date: retrievedDate,
        mediaType,
        url,
        title
      });
    } catch(err) {
      console.log('Error getAPOD', err);
    }
  };

  handlePrev = () => {
    const { date } = this.state;
    const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    console.log(prevDate);
    this.getAPOD(prevDate);
  };

  handleNext = () => {
    const { date, maxDate } = this.state;
    if (date === maxDate) return;

    const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
    this.getAPOD(nextDate);
  };

  // 이미지 로딩이 완료되면 로더 숨김
  handleHiddenLoader = () => {
    this.setState({
      loading: false
    });
  };

  componentWillMount() {
    this.getAPOD();
  }

  render() {
    const { url, mediaType, title, date, loading } = this.state;
    const { handlePrev, handleNext, handleHiddenLoader } = this;

    return (
      <ViewerTemplate
        spaceNavigator={(
          <SpaceNavigator
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
        viewer={(
          <Viewer
            url={url}
            mediaType={mediaType}
            title={title}
            date={date}
            loading={loading}
            handleHiddenLoader={handleHiddenLoader}
          />
        )}
      />
    );
  }
}

export default App;

import React, { Component } from 'react';
import Navigator from 'components/Navigator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as apodActions from 'store/modules/apod';

class NavigatorContainer extends Component {
  handlePrev = () => {
    const { ApodActions } = this.props;
    ApodActions.previous();
  };

  handleNext = () => {
    const { ApodActions, date, maxDate } = this.props;
    console.log('확인 maxDate', maxDate);

    if (date === maxDate) return; // 오늘이면 여기서 스탑
    ApodActions.next();
  };

  render() {
    const { handlePrev, handleNext } = this;

    return (
      <Navigator
        onPrev={handlePrev}
        onNext={handleNext}
      />
    );
  }
}

export default connect(
  ({ apod }) => ({
    date: apod.date,
    maxDate: apod.maxDate
  }),
  (dispatch) => ({
    ApodActions: bindActionCreators(apodActions, dispatch)
  })
)(NavigatorContainer);
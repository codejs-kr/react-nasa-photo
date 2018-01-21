import React, { Component } from 'react';
import ViewerTemplate from 'components/ViewerTemplate';
import NavigatorContainer from 'containers/NavigatorContainer';
import ViewerContainer from 'containers/ViewerContainer';

class App extends Component {
  render() {
    return (
      <ViewerTemplate
        spaceNavigator={(
          <NavigatorContainer />
        )}
        viewer={(
          <ViewerContainer />
        )}
      />
    );
  }
}

export default App;

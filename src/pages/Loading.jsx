import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
class Loading extends Component {
  render() {
    return (
      <div>
        <ClipLoader
          color={"#003BE5"}
          loading={true}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
}

export default Loading;

import React from "react";
import "../css/BrilliantButton.css";

class BrilliantButton extends React.Component {
  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  render() {
    const { buttonText } = this.props;

    return (
      <div className="button-container">
        <button onClick={this.handleClick}>{buttonText}</button>
      </div>
    );
  }
}

export default BrilliantButton;

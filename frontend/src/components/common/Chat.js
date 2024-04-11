import React, { Component } from "react";
import { Widget, renderCustomComponent } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "react-quill/dist/quill.snow.css";
import { clearFileUpload } from "../../auth/authActions";
import { connect } from "react-redux";
import ChatForm from "./ChatForm";
import { DECODED_TOKEN } from "../helpers/Helper";

class CustomComponent extends Component {
  render() {
    return (
      <div>
        <ChatForm />
      </div>
    );
  }
}
class Chat extends Component {
  componentDidMount() {
    renderCustomComponent(CustomComponent, { src: null });
  }

  render() {
    return (
      <div className="Chat">
        {localStorage.getItem("authToken")?.length && DECODED_TOKEN(this.props.token)?.verified ? (
          <Widget
            title="ArchiveHub"
            subtitle={
              <span>
                Collaborate with researchers.
                <br /> (Only within ArchiveHub connections)
              </span>
            }
            autofocus={false}
            handleToggle={(toggle) => {
              if (!toggle) this.props.clearFileUpload();
            }}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearFileUpload: () => {
      dispatch(clearFileUpload());
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);

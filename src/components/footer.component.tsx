import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import "../styles/App.css";

export default class CustomFooter extends Component {
  render() {
    return (
      <div  style={{ paddingTop: 32 }}>
        <div className="custom-footer">
          <Typography
            variant="caption"
            align={"center"}
            style={{ color: "#FFF" }}
          >
            © Copyright 2020
          </Typography>
        </div>
      </div>
    );
  }
}

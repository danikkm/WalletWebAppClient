import React, { Component, Props } from "react";

import "./styles/Home.css";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { homeSections } from "./components/homeSections.component";

export default class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: this.props.location.state?.users,
      homeSections: homeSections,
    };
  }

  render() {
    const { homeSections } = this.state;
    return (
      <div className="home-wrapper">
        <div className="home-inner">
          <Container className="card-grid" maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {homeSections.map((section: any) => (
                <Grid item key={section.id} xs={12} sm={6} md={4}>
                  <Card className="card">
                    {section.cardMedia}
                    {section.cardContent}
                    {section.cardActions}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

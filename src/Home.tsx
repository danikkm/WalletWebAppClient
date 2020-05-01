import React, { Component } from "react";

import { Button} from "reactstrap";
import "./styles/Home.css";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const cards = [1, 2, 3];

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <div className="home-inner">

        <Container className="card-grid" maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className="card">
                  <CardMedia
                    className="card-media"
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className="card-content">
                    <Typography gutterBottom variant="h5" component="h2">
                      List of users
                    </Typography>
                    <Typography>
                      You can manage users.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="medium" color="inherit" href="/users" className="button">
                    Manage Users
                    </Button>
                  </CardActions>
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

export default Home;

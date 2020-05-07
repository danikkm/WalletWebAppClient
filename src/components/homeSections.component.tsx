import React from "react";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Cookies from 'js-cookie';

export const homeSections = [
    {
      id: 1,
      cardMedia: (
        <CardMedia
          className="card-media"
          image="https://source.unsplash.com/random"
          title="Image title"
        />
      ),
      cardContent: (
        <CardContent className="card-content">
          <Typography gutterBottom variant="h5" component="h2">
            List of users
          </Typography>
          <Typography>You can manage users.</Typography>
        </CardContent>
      ),
      cardActions: (
        <CardActions>
          <Button
            size="medium"
            color="inherit"
            href={"/users/" + Cookies.get("username") as string} 
            className="button"
          >
            Manage Users
          </Button>
        </CardActions>
      ),
    },
    {
      id: 2,
      cardMedia: (
        <CardMedia
          className="card-media"
          image="https://source.unsplash.com/random"
          title="Image title"
        />
      ),
      cardContent: (
        <CardContent className="card-content">
          <Typography gutterBottom variant="h5" component="h2">
            List of accounts
          </Typography>
          <Typography>You can manage your accounts.</Typography>
        </CardContent>
      ),
      cardActions: (
        <CardActions>
          <Button
            size="medium"
            color="inherit"
            href={"/accounts/" + Cookies.get("username") as string} 
            className="button"
          >
            Manage Accounts
          </Button>
        </CardActions>
      ),
    },
    {
      id: 3,
      cardMedia: (
        <CardMedia
          className="card-media"
          image="https://source.unsplash.com/random"
          title="Image title"
        />
      ),
      cardContent: (
        <CardContent className="card-content">
          <Typography gutterBottom variant="h5" component="h2">
            List of Ledgers
          </Typography>
          <Typography>You can manage your ledgers.</Typography>
        </CardContent>
      ),
      cardActions: (
        <CardActions>
          <Button
            size="medium"
            color="inherit"
            href={"/ledgers/" + Cookies.get("username") as string} 
            className="button"
          >
            Manage Ledgers
          </Button>
        </CardActions>
      ),
    },
  ];

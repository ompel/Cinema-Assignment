import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import './MovieItem.css';

class MovieItem extends Component {
  render() {
    const {
      id,
      title,
      director,
      genre,
      runtime,
      year,
      poster
    } = this.props;

    return (
      <Card className="MovieItem m-2 text-center">
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{`By ${director}`}</CardSubtitle>
        </CardBody>
        <div className="img-crop">
          <CardImg top width="100%" src={poster} alt={`poster image for ${title} by ${director}`} />
        </div>
      </Card>
    );
  }
}

export default MovieItem;

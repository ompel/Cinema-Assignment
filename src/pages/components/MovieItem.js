import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MovieItem.css';

class MovieItem extends Component {
  render() {
    const { title, director, poster } = this.props;
    return (
      <Card className="MovieItem text-center">
        <div id="card-overlay">
          <div className="h-100 d-flex justify-content-center align-items-center overlay-content">
            <FontAwesomeIcon icon='edit' />
          </div>
        </div>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{`Directed by ${director}`}</CardSubtitle>
        </CardBody>
        <div className="img-crop">
          <CardImg top width="100%" src={poster} alt={`poster image for ${title} by ${director}`} />
        </div>
      </Card>
    );
  }
}

export default MovieItem;

import React from 'react';
import PropTypes from 'prop-types';
import chew from '../img/chewbacca.jpg';

class Card extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare, cardTrunfo } = this.props;
    return (
      <section>
        <span data-testid="name-card">{cardName}</span>
        <img
          data-testid="image-card"
          className="img-champ"
          src={ cardImage || chew }
          alt={ cardName }
        />
        <span
          data-testid="description-card"
        >
          {cardDescription}
        </span>
        <div>
          <span
            data-testid="attr1-card"
          >
            {cardAttr1}
          </span>
          <span
            data-testid="attr2-card"

          >
            {cardAttr2}
          </span>
          <span
            data-testid="attr3-card"

          >
            {cardAttr3}
          </span>
        </div>
        <span data-testid="rare-card">{cardRare}</span>
        {cardTrunfo === true && <h4 data-testid="trunfo-card"> Super Trunfo </h4>}
        {/* {
          (cardTrunfo === true)
          && <span data-testid="trunfo-card">{' '}</span>
        } */}

      </section>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;

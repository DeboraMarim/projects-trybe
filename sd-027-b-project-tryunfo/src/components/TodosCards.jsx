import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class ListCard extends React.Component {
  constructor() {
    super();

    this.state = {
      filter: 'todas',
      trunfo: false,
    };
    this.removeButton = this.removeButton.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.hasTrunfo = this.hasTrunfo.bind(this);
  }

  handleFilterChange(event) {
    this.setState({
      filter: event.target.value,
    });
  }

  removeButton(event) {
    event.target.parentNode.remove();
    const { checkHasTrunfo } = this.props;
    checkHasTrunfo();
  }

  hasTrunfo() {
    const { trunfo } = this.state;

    if (trunfo) {
      this.setState({
        trunfo: false,
      });
    } else {
      this.setState({
        trunfo: true,
      });
    }
  }

  cardsRender(card) {
    return (
      <div key={ card.nameCard }>
        <Card
          cardName={ card.nameCard }
          cardDescription={ card.description }
          cardImage={ card.image }
          cardAttr1={ card.attr1 }
          cardAttr2={ card.attr2 }
          cardAttr3={ card.attr3 }
          cardRare={ card.rare }
          cardTrunfo={ card.trunfo }
        />
        <button
          data-testid="delete-button"
          type="button"
          onClick={ this.removeButton }
        >
          Excluir carta
        </button>
      </div>
    );
  }

  render() {
    const { cards } = this.props;
    const { filter, trunfo } = this.state;
    console.log(cards);
    return (
      <section>
        <div>
          <input
            data-testid="name-filter"
            placeholder="Nome carta"
            onChange={ this.handleFilterChange }
            disabled={ trunfo }
          />
          <select
            data-testid="rare-filter"
            onChange={ this.handleFilterChange }
            disabled={ trunfo }
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
          <label htmlFor="description">
            Trunfo
            <input
              data-testid="trunfo-filter"
              type="checkbox"
              onClick={ this.hasTrunfo }
            />
          </label>
        </div>
        <div>
          { (filter !== 'todas')
            ? (cards.filter((card) => (card.nameCard.includes(filter)
              || card.rare === filter))
              .map((card) => (
                this.cardsRender(card)
              )))
            : (cards.filter((card) => {
              if (trunfo) return card.trunfo === trunfo;
              return card;
            }).map((card) => (
              this.cardsRender(card)
            )))}
        </div>
      </section>
    );
  }
}

ListCard.propTypes = {
  cards: PropTypes.isRequired,
  checkHasTrunfo: PropTypes.func.isRequired,
};

export default ListCard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchContact.module.css';

class SearchContact extends Component {
  render() {
    const { contacts, filter, handleFilter, handleDeleteContact } = this.props;

    const filteredArray = [
      ...contacts.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ),
    ];
    return (
      <>
        <label className={css.find__contacts}>
          Find contacts by name:{' '}
          <input
            type="text"
            name="search"
            value={filter}
            onChange={handleFilter}
          />
        </label>
        {filter && (
          <ul className={css.contacts__list}>
            {filteredArray.map(({ name, number, id }) => {
              return (
                <li key={id} className={css.contacts__item}>
                  {name} {number}
                  <button
                    onClick={() => handleDeleteContact(id)}
                    className={css.contacts__delete}
                  >
                    x
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }
}

SearchContact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleDeleteContact: PropTypes.func,
};

export default SearchContact;

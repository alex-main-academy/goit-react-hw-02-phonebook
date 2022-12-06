import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import SearchContact from './SearchContact/SearchContact';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  handleEnterName = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  handleAddContact = event => {
    event.preventDefault();
    const userName = event.target.elements.name.value;
    const userNumber = event.target.elements.number.value;

    const isUser = Boolean(
      this.state.contacts.find(item => item.name === userName)
    );

    if (isUser) {
      alert(`${userName} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            name: userName,
            number: userNumber,
            id: nanoid(),
          },
        ],
      }));
    }

    this.setState({
      name: '',
      number: '',
    });
  };

  handleDeleteContact = id => {
    this.setState({
      contacts: [...this.state.contacts.filter(item => item.id !== id)],
    });
  };

  render() {
    return (
      <section className="phonebook">
        <h1 className="phonebook__title">Phone book</h1>
        <ContactForm
          handleAddContact={this.handleAddContact}
          handleEnterName={this.handleEnterName}
          name={this.state.name}
          number={this.state.number}
        />
        <h2 className="contacts__title">Contacts:</h2>
        <SearchContact
          contacts={this.state.contacts}
          filter={this.state.filter}
          handleFilter={this.handleFilter}
          handleDeleteContact={this.handleDeleteContact}
        />
        <ContactsList
          contacts={this.state.contacts}
          filter={this.state.filter}
          handleDeleteContact={this.handleDeleteContact}
        />
      </section>
    );
  }
}

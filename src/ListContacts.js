import React, { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class ListContacts extends Component {
  static propTypes = {
    contacts: Proptypes.array.isRequired,
    onDeleteContact: Proptypes.func.isRequired
  };

  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;
    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingContacts = contacts.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy("name"));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            type="text"
            className="search-contacts"
            placeholder="Search contacts"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <Link
            className="add-contact"
            to="/create"
          />
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className="contact-list">
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;

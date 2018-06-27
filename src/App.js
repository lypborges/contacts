import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: []
  };

  removeContact = contact => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(item => {
        return item.id !== contact.id;
      })
    }));

    ContactsAPI.remove(contact);
  };
  componentDidMount() {
    ContactsAPI.getAll().then(contacts =>
      this.setState({
        contacts
      })
    );
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(savedContact => {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, savedContact]
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

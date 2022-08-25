import { useState, useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';
import { Wrapper } from './App.styled';
import ContactsView from 'components/ContactsView';
import ContactsFilter from 'components/ContactsFilter';
import ContactForm from 'components/ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);

  const [filter, setFilter] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    const paeserContacts = JSON.parse(localStorage.getItem('contacts'));
    if (paeserContacts) {
      setContacts(paeserContacts);
    } else {
      setContacts([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const indexName = contacts.findIndex(contact => contact.name === name);
    if (indexName === -1) {
      setContacts(prevState => [
        ...prevState,
        {
          id: contact.id,
          name: contact.name,
          number: contact.number,
        },
      ]);
      setFilter('');
    } else {
      alert(name + ' is already in contacts');
    }

    resetForm();
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <ContactsFilter value={filter} onChange={changeFilter} />
      <ContactsView
        contacts={getVisibleContact()}
        onDeleteContact={deleteContact}
      />
    </Wrapper>
  );
}

export default App;

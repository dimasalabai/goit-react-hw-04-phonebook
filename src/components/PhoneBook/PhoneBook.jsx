import { nanoid } from 'nanoid';

import { useEffect, useState, useRef } from 'react';

import styles from './phone-book.module.css';

import PhoneBookForm from './PhoneBookForm/PhoneBookForm';
import Filter from './Contacts/Filter/Filter';
import Contacts from './Contacts/Contacts';

const PhoneBook = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('contacts'));

    return data || [];
  });
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const isDublicate = ({ name, phone }) => {
    const normalizedName = name.toLowerCase();
    const normalizedPhone = phone.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentPhone = item.phone.toLowerCase();

      return (
        normalizedCurrentName === normalizedName ||
        normalizedCurrentPhone === normalizedPhone
      );
    });

    return !!dublicate;
  };

  const addСontact = data => {
    // data - state форми

    if (isDublicate(data)) {
      return alert(
        `Contact with this ${data.name || data.phone} already in contacts book`
      );
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return [...prevContacts, newContact];
    });
  };

  const deleteСontact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name, phone }) => {
      const normalizedName = name.toLowerCase();
      const normalizedPhone = phone.toLowerCase();

      return (
        normalizedName.includes(normalizedFilter) ||
        normalizedPhone.includes(normalizedFilter)
      );
    });

    return filteredContacts;
  };

  const items = getFilteredContacts();

  return (
    <div className={styles.wrapper}>
      <h2>Phonebook</h2>
      <PhoneBookForm onSubmit={addСontact} />
      <h2>Contacts</h2>
      <Filter changeFilter={changeFilter} />
      <Contacts items={items} deleteContact={deleteСontact} />
    </div>
  );
};

/*
class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(perevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  isDublicate({ name, phone }) {
    const normalizedName = name.toLowerCase();
    const normalizedPhone = phone.toLowerCase();

    const { contacts } = this.state;

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentPhone = item.phone.toLowerCase();

      return (
        normalizedCurrentName === normalizedName ||
        normalizedCurrentPhone === normalizedPhone
      );
    });

    return !!dublicate;
  }

  addСontact = data => {
    // data - state форми

    if (this.isDublicate(data)) {
      return alert(
        `Contact with this ${data.name || data.phone} already in contacts book`
      );
    }

    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  deleteСontact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(item => item.id !== id);

      return {
        contacts: newContact,
      };
    });
  };

  changeFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name, phone }) => {
      const normalizedName = name.toLowerCase();
      const normalizedPhone = phone.toLowerCase();

      return (
        normalizedName.includes(normalizedFilter) ||
        normalizedPhone.includes(normalizedFilter)
      );
    });

    return filteredContacts;
  }

  render() {
    const { addСontact, deleteСontact, changeFilter } = this;

    const contacts = this.getFilteredContacts();

    return (
      <div className={styles.wrapper}>
        <h2>Phonebook</h2>
        <PhoneBookForm onSubmit={addСontact} />
        <h2>Contacts</h2>
        <Filter changeFilter={changeFilter} />
        <Contacts items={contacts} deleteContact={deleteСontact} />
      </div>
    );
  }
} */

export default PhoneBook;

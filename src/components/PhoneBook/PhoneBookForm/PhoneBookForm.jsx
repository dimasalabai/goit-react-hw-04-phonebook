import { nanoid } from 'nanoid';
import { Component } from 'react';
import styles from './phone-book-form.module.css';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

class PhoneBookForm extends Component {
  contactsName = nanoid();

  state = {
    ...INITIAL_STATE,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ ...INITIAL_STATE });
  };
  render() {
    const { contactsName, handleChange, handleSubmit } = this;
    const { name, phone } = this.state;

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor={contactsName}>Name</label>
          <input
            value={name}
            onChange={handleChange}
            id={contactsName}
            type="text"
            name="name"
            required
            placeholder="Name"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={contactsName}>Number</label>
          <input
            value={phone}
            onChange={handleChange}
            id={contactsName}
            type="tel"
            name="phone"
            required
            placeholder="Phone"
            className={styles.formInput}
          />
        </div>
        <button type="submit" className={styles.btn}>
          Add Contact
        </button>
      </form>
    );
  }
}

export default PhoneBookForm;

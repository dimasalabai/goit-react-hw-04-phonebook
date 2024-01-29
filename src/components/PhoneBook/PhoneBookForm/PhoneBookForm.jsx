import { nanoid } from 'nanoid';
import { useMemo, useState, memo, useCallback } from 'react';
import styles from './phone-book-form.module.css';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

const PhoneBookForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = useCallback(({ target }) => {
    const { name, value } = target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...INITIAL_STATE });
  };

  const contactsName = useMemo(() => nanoid(), []);
  const contactsPhone = useMemo(() => nanoid(), []);

  const { name, phone } = state;

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
        <label htmlFor={contactsPhone}>Number</label>
        <input
          value={phone}
          onChange={handleChange}
          id={contactsPhone}
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
};

/*
class PhoneBookForm extends Component {
  contactsName = nanoid();
  contactsPhone = nanoid();

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
    const { contactsName, contactsPhone, handleChange, handleSubmit } = this;
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
          <label htmlFor={contactsPhone}>Number</label>
          <input
            value={phone}
            onChange={contactsPhone}
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
}*/

export default memo(PhoneBookForm);

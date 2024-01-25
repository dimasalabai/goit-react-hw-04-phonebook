import styles from './contacts.module.css';

const Contacts = ({ items, deleteContact }) => {
  const contacts = items.map(({ id, name, phone }) => {
    return (
      <li key={id}>
        {name}: {phone}{' '}
        <button onClick={() => deleteContact(id)} type="button">
          Delete
        </button>
      </li>
    );
  });
  return (
    <div className={styles.wrapper}>
      <ul>{contacts}</ul>
    </div>
  );
};

export default Contacts;

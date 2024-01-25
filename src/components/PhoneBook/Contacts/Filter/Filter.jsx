import styles from './filter.module.css';
import { nanoid } from 'nanoid';
const Filter = ({ changeFilter }) => {
  const search = nanoid();
  return (
    <div className={styles.formGroup}>
      <label htmlFor={search}> Search contacts by name or phone</label>
      <input
        id={search}
        onChange={changeFilter}
        name="filter"
        placeholder="Search"
      />
    </div>
  );
};

export default Filter;

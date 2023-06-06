import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/TodoItem.module.css';

const TodoItem = ({
  itemProp, handleChange, delTodo, setUpdate,
}) => {
  const [editing, setEditing] = useState(false);
  const viewMode = {};
  const editMode = {};
  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setUpdate(event.target.value, itemProp.id);
      setEditing(false);
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.content} style={viewMode}>
        <input
          type="checkbox"
          checked={itemProp.completed}
          onChange={() => handleChange(itemProp.id)}
        />
        <button
          type="button"
          className="deleteBtn"
          onClick={() => delTodo(itemProp.id)}
        >
          Delete
        </button>
        <button type="button" className="editBtn" onClick={handleEditing}>
          Edit
        </button>
        <div style={{ width: '300px' }}>{itemProp.title}</div>
      </div>
      <input
        onKeyDown={handleUpdatedDone}
        type="text"
        defaultValue={itemProp.title}
        className={styles.textInput}
        style={editMode}
      />
    </li>
  );
};

TodoItem.propTypes = {
  itemProp: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

export default TodoItem;

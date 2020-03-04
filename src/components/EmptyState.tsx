import React, { useContext } from 'react';
import { CardBody } from 'reactstrap';
import { FiUserX } from 'react-icons/fi';
import { State } from '../store';

/**
 * No contacts component
 */
const EmptyState = () => {
  const { state } = useContext(State);

  if (state.contacts.length > 0) {
    return null;
  } else {
    return (
      <CardBody>
        <p className={"text-center text-muted"}>
          <span className={"d-block h3"}>
            <FiUserX />
          </span>
          <span>No contacts found</span>
        </p>
      </CardBody>
    );
  }
};

export default EmptyState;
import React, { Fragment, useContext } from 'react';
import { Row, Col, Button, NavLink, CardBody, ListGroup, ListGroupItem, Media, Collapse, FormGroup, Input } from 'reactstrap';
import { FiPhone, FiEdit2, FiTrash2, FiTrash } from 'react-icons/fi';
import { State } from '../store';
import { toggleForm, editContact, deleteContact, toggleSelectContact, toggleSelectAllContact, deleteBulkSelected } from '../actions';

/**
 * Contact card function component
 * @param props 
 */
const Contact = (props:any) => {
  const { name, lastname, contrycode, phone } = props.data;
  const avatarType = encodeURIComponent(name.toLowerCase());
  
  return (
    <Media tag={"div"} className={"border-primary"}>
      <Media object 
        width={"64px"}
        className={"align-self-start mr-3 rounded-circle"} 
        alt={"Conctact Name"} 
        src={`https://api.adorable.io/avatars/285/${avatarType}@adorable.png`} 
      />
      <Media body className={"media-body"}>
        <h5 className={"mt-1 mb-1"}>{`${name} ${lastname}`}</h5>
        <p className={"text-muted mb-0"}>
          <span className={"mr-2"}><FiPhone /></span>{' '}
          <span className={"text-primary"}>
            {`(${contrycode}) ${phone}`}
          </span>
        </p>
      </Media>
    </Media>
  );
};

/**
 * Contact List Component
 * 
 */
const ContactList = () => {
  const { state: { contacts, form }, dispatch } = useContext(State);

  /**
   * Edit contact handler
   * @param contact 
   */
  const editButtonHandler = (contact:any) => {
    dispatch(toggleForm('open'));
    dispatch(editContact(contact, contact.id));
  };

  /**
   * Delete contact handler
   * @param contact 
   */
  const deleteButtonHandler = (contact:any) => {
    if (window.confirm(`Are you sure you want to delete '${contact.name} ${contact.lastname}'?`)) {
      dispatch(deleteContact(contact.id));
    }
  };

  /**
   * Toggle contact select
   * @param index 
   */
  const onCheckHandler = (index:number) => dispatch(toggleSelectContact(index));

  /**
   * Toggle all handler
   */
  const onCheckAllHandler = () => dispatch(toggleSelectAllContact());

  /**
   * Delete all handler
   */
  const deleteSelectedHandler = () => dispatch(deleteBulkSelected());

  /**
   * Create list component
   */
  const ContactsComponentCollection = contacts.map((contact:any, index:number) => {
    const c = { ...contact, id: index };
    
    return (
      <Fragment key={index}>
        <ListGroupItem className={`contact--item ${form.edit === index || form.bulk.includes(index) ? 'bg-light' : ''}`}>
          <NavLink>
            <Row className={"align-items-center"}>
              <Col xs={8}> 
                <Input 
                  id="contact-select" 
                  type="checkbox" 
                  checked={form.bulk.includes(index)}
                  onChange={() => onCheckHandler(index)}
                  className={"mt-4 mr-3 checkbox--select-contact"} />
                <Contact data={c} />
              </Col>
              <Col xs={4} className={"text-right"}>
                <Button color={"link"} className={"h3 button--edit-contact"} onClick={() => editButtonHandler(c)}>
                  <FiEdit2 />
                </Button>
                <Button color={"link"} className={"h3 button--edit-contact"} onClick={() => deleteButtonHandler(c)}>
                  <FiTrash2 />
                </Button>
              </Col>
            </Row>
          </NavLink>
        </ListGroupItem>
      </Fragment>
    );
  });

  return (
    <ListGroup className={"list-group-flush"}>
      <Collapse isOpen={form.bulk.length > 0}>
        <CardBody>
          <Row className={"justify-content-between align-items-center"}>
            <Col xs={2}>
              <FormGroup>
                <Input 
                  id="contact-select--all" 
                  type="checkbox" 
                  onChange={() => onCheckAllHandler()}
                  checked={form.bulk.length === contacts.length}
                  className={"ml-0"} />
              </FormGroup>
            </Col>
            <Col xs={2}>
              <Button color={"link"} onClick={() => deleteSelectedHandler()}>
                <FiTrash />
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Collapse>

      {ContactsComponentCollection}
    </ListGroup>
  );
};

export default ContactList;
import React, { useContext } from 'react';
import { Col, Button, CardBody, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { State } from '../store';
import { setFormData, addContact, saveContact } from '../actions';

/**
 * Contact form component
 */
const FormComponent = () => {
  const { state: { form }, dispatch } = useContext(State);

  /**
   * Dispatch the form data
   * @param data
   */
  const sendFormData = (data:any) => {
    dispatch(setFormData(data));
  };

  /**
   * Handle the form field change
   * @param e
   */
  const onChangeHandler = (e:any) => {
    e.preventDefault();
    let data:any = {};
    
    data[e.target.name] = e.target.value;
    sendFormData(data);
  }

  /**
   * @returns {Boolean}
   */
  const isFormDirty = () => {
    let isDirty = false;
    for (const key in form.data) {
      if (form.data.hasOwnProperty(key)) {
        const element = form.data[key];
        if (element === "") {
          isDirty = true;
        }
      }
    }
    if (isDirty) {
      alert(`Please complete all form fields`);
    }
    return isDirty;
  }

  /**
   * Handle the add button click
   */
  const onAddClickHandler = (e:any) => {
    e.preventDefault();
    
    if (!isFormDirty()) {
      dispatch(addContact(form.data));
    }
  }

  /**
   * Handle the edit button click
   */
  const onEditClickHandler = (e:any) => {
    e.preventDefault();

    if (!isFormDirty()) {
      dispatch(saveContact(form.data, form.edit));
    }
  }

  return (
    <Collapse isOpen={form.state === 'open'}>
      <CardBody className={"border-bottom"}>
        <Form>
          <FormGroup row>
            <Col sm={6}>
              <Label for={"name"} className={"mb-0"}>Name:</Label>
              <Input type={"text"} id={"name"} name={"name"} value={form.data.name} onChange={onChangeHandler} />
            </Col>
            <Col sm={6}>
              <Label for={"lastname"} className={"mb-0"}>Last Name:</Label>
              <Input type={"text"} id={"lastname"} name={"lastname"} value={form.data.lastname} onChange={onChangeHandler} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={6}>
              <Label for={"contrycode"} className={"mb-0"}>Country Code:</Label>
              <Input type={"text"} id={"contrycode"} name={"contrycode"} value={form.data.contrycode} onChange={onChangeHandler} />
            </Col>
            <Col sm={6}>
              <Label for={"phone"} className={"mb-0"}>Phone Number:</Label>
              <Input type={"text"} id={"phone"} name={"phone"} value={form.data.phone} onChange={onChangeHandler} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col className={"align-self-end text-right"}>
              { form.edit !== null 
                ? <Button color={"primary"} onClick={onEditClickHandler}>
                    <span>Edit <FiCheck /></span> 
                  </Button>
                : <Button color={"primary"} onClick={onAddClickHandler}>
                    <span>Add  <FiPlus /></span>
                  </Button>
                }
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Collapse>
  );
};

export default FormComponent;
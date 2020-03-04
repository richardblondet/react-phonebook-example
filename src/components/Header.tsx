import React, { useContext } from 'react';
import { Container, Row, Col, Button, CardHeader } from 'reactstrap';
import { FiUserPlus, FiX } from 'react-icons/fi';
import { State } from '../store';
import { toggleForm } from '../actions';

const Header = () => {
  const { state, dispatch } = useContext(State);
  // console.log("State", state);
  
  /**
   * Handle form display
   */
  const formToggleHandler = () => {
    dispatch(toggleForm(state.form.state === 'open' ? 'closed' : 'open'));
  }

  return (
    <CardHeader className={"border-0"}>
      <Container fluid>
        <Row className={"align-items-center justify-content-between"}>
          <Col sm={4}>
            <strong className={"h5"}>Contacts</strong>
          </Col>
          <Col sm={2} className={"align-self-end text-right"}>
            <Button color={"link m-auto"} onClick={formToggleHandler}>
              {state.form.state === 'closed' && 
                <FiUserPlus />
              }
              {state.form.state === 'open' && 
                <FiX />
              }
            </Button>
          </Col>
        </Row>
      </Container>
    </CardHeader>
  );
};

export default Header;
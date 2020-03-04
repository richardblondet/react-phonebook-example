import React from 'react';
import { StateProvider } from './store';
import { Reducer, initialState } from './reducers';
import { Container, Row, Col, Card } from 'reactstrap';
import { Header, Form, Contacts, EmptyState } from './components';

/**
 * Application Component
 */
const App = () => {
  return (
    <StateProvider reducer={Reducer} initialState={initialState}>
      <div className={"App p-5"}>
        <Container>
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Card className={"shadow-lg border-0"}>
                <Header />
                <Form />
                <Contacts />
                <EmptyState />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </StateProvider>
  );
};

export default App;

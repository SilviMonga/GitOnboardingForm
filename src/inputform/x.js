import React, { useEffect, useState } from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Form, Button } from 'reactstrap';

function InputForm() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

  }


  useEffect(()=>{
    console.log("inside useeffect of InputForm");
  },[email])


  return (

    <Container>
      <h1>Picarro</h1>
      <Form inline>
        <Row>
          <Col>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleEmail" className="mr-sm-2">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="something@idk.cool"
                onChange={handleEmailChange} 
                value={email}
                />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
            </FormGroup>

          </Col>
          <Col>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
            </FormGroup>
          </Col>
        </Row>
        <Button>Submit</Button>
      </Form>

    </Container>
  );
};

export default InputForm;

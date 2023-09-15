import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import Toggle from 'react-bootstrap-toggle';
import axios from 'axios';
import Papa from 'papaparse';

function InputForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobilePhone: '',
    manager: '',
    startDate: '',
    jobTitle: '',
    department: '',
    location: '',
    seating: '',
    employmentGroup: '',
    distributionList: '',
    additionalLists: '',
    systemRequired: '',
    applicationAccess: [],
    netsuiteClone: '',
    githubRepositories: [],
    additionalSoftware: [],
    additionalNotes: '',
    itTicket: '',
    cancelReason: '',
    started: false,
    cancel: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleChange = (name) => {
    setFormData({ ...formData, [name]: !formData[name] });
  };

  const [githubRepoOptions, setGithubRepoOptions] = useState([]); // State to store GitHub repo options

  
  // Load GitHub repository options from CSV file
  useEffect(() => {
    console.log('Fetching GitHub repo options...');
    // Adjust the path to your CSV file
    const parsefile = './githubRepo.csv'
    Papa.parse(parsefile, {
      header: true,
      download: true,
      complete: (results) => {
        if (results.data) {
          const options = results.data.map((row) => ({
            value: row.value,
            label: row.label,
          }));
          console.log('GitHub Results data:', results.data);
          console.log('GitHub repo options:', options);
          setGithubRepoOptions(options);
        }
      },
    });
  }, []);

  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData({ ...formData, [name]: selectedOptions });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Prepare the data to send to JIRA (adjust the field names as needed)
      const jiraData = {
        fields: {
          project: {
            key: 'YOUR_PROJECT_KEY',
          },
          summary: formData.firstName + ' ' + formData.lastName + ' Onboarding Request',
          description: `**Access Request:**\n\n
            - GitHub Repositories: ${formData.githubRepositories.join(', ')}\n
            - Additional Tools: ${formData.additionalSoftware.join(', ')}\n\n
            **Other Details:**\n\n
            - Department: ${formData.department}\n
            - Distribution List: ${formData.distributionList}\n
            - System: ${formData.systemRequired}\n
            - Manager: ${formData.manager}\n
            - Start Date: ${formData.startDate}\n
            - ... (other fields)\n`,
          // Add other JIRA fields here based on your JIRA configuration
        },
      };
  
      // Make a POST request to JIRA's API to create the ticket
      const response = await axios.post('YOUR_JIRA_API_URL', jiraData, {
        headers: {
          'Authorization': 'Basic YOUR_AUTHORIZATION_HEADER', // Replace with your authorization header
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        // Ticket created successfully
        alert('Ticket created successfully in JIRA!');
      } else {
        // Handle any error conditions here
        alert('Failed to create the ticket in JIRA.');
      }
    } catch (error) {
      console.error('Error creating JIRA ticket:', error);
      alert('An error occurred while creating the JIRA ticket.');
    }
  };
  

  return (
    <Container>
      <h1>Onboarding Form</h1>
      <Form onSubmit={handleSubmit}>
        {/* First Name */}
        <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          {/* Middle Name */}
          <Col>
            <Form.Group controlId="middleName">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          {/* Last Name */}
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col>
        {/* Mobile Phone */}
        <Form.Group controlId="mobilePhone">
          <Form.Label>Mobile Phone (for emergency use)</Form.Label>
          <Form.Control
            type="text"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleInputChange}
        />
        </Form.Group>
        </Col>
        <Col>
        {/* Manager (Dropdown) */}
        <Form.Group controlId="manager">
              <Form.Label>Manager *</Form.Label>
              <Form.Control
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
                required
              />
        </Form.Group>
        {/* <Form.Group controlId="manager">
          <Form.Label>Manager *</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="manager-dropdown">
              {formData.manager || 'Select Manager'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDropdownChange('manager', 'Manager A')}>Manager A</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownChange('manager', 'Manager B')}>Manager B</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownChange('manager', 'Manager C')}>Manager C</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group> */}
        </Col>
        <Col>
        {/* Start Date (Date Picker) */}
        <Form.Group controlId="startDate">
          <Form.Label>Start Date *</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col>
        {/* Job Title */}
        <Form.Group controlId="jobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
        </Form.Group>
        </Col>
        <Col>
        {/* Department (Dropdown) */}
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="department-dropdown">
              {formData.department || 'Select Department'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDropdownChange('department', 'HR')}>HR</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownChange('department', 'Finance')}>Finance</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownChange('department', 'IT')}>IT</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        </Col>
        <Col>
        {/* Location (Dropdown) */}
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="location-dropdown">
              {formData.location || 'Select Location'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDropdownChange('location', 'India')}>India</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownChange('location', 'San Francisco')}>San Francisco</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownChange('location', 'Santa Clara')}>Santa Clara</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col>
        {/* Seating */}
        <Form.Group controlId="seating">
          <Form.Label>Seating</Form.Label>
          <Form.Control
            type="text"
            name="seating"
            value={formData.seating}
            onChange={handleInputChange}
          />
        </Form.Group>
        </Col>
        <Col>
        {/* Employment Group (Dropdown) */}
        <Form.Group controlId="employmentGroup">
          <Form.Label>Employment Group</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="employmentGroup-dropdown">
              {formData.employmentGroup || 'Select Employment Group'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDropdownChange('employmentGroup', 'Full-Time')}>Full-Time</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownChange('employmentGroup', 'Part-Time')}>Part-Time</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownChange('employmentGroup', 'Contract')}>Contract</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        </Col>
        <Col>
        {/* Distribution List */}
        <Form.Group controlId="distributionList">
          <Form.Label>Distribution List</Form.Label>
          <Form.Control
            type="text"
            name="distributionList"
            value={formData.distributionList}
            onChange={handleInputChange}
          />
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col>
         {/* Git Repository (Multiselect dropdown) */}
         <Form.Group controlId="githubRepositories">
          <Form.Label>Git Repo</Form.Label>
          <Select
            isMulti
            name="githubRepositories"
            options={githubRepoOptions}
            value={formData.githubRepositories}
            onChange={(selectedOptions) => handleMultiSelectChange('githubRepositories', selectedOptions)}
          />
        </Form.Group>
        </Col>
        <Col>
        {/* applicationAccess */}
        <Form.Group controlId="applicationAccess">
          <Form.Label>Application Access</Form.Label>
          <Select
            isMulti
            options={[
              { value: 'Jira', label: 'Jira' },
              { value: 'Slack', label: 'Slack' },
              { value: 'Teams', label: 'Teams' },
            ]}
            value={formData.applicationAccess}
            onChange={(selectedOptions) => handleMultiSelectChange('applicationAccess', selectedOptions)}
          />
        </Form.Group>
        </Col>
        <Col>
        {/* Additional Lists */}
        <Form.Group controlId="additionalLists">
          <Form.Label>Additional Lists</Form.Label>
          <Form.Control
            type="text"
            name="additionalLists"
            value={formData.additionalLists}
            onChange={handleInputChange}
          />
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col>
        {/* Started (Toggle Button) */}
        <Form.Group controlId="started">
          <Form.Label>Started</Form.Label>
          <div>
            <Toggle
              name="started"
              active={formData.started}
                onClick={() => handleToggleChange('started')}
                size="sm"
            />
          </div>
        </Form.Group>
      </Col>
      <Col>
        {/* Cancel (Toggle Button) */}
        <Form.Group controlId="cancel">
          <Form.Label>Cancel</Form.Label>
          <div>
            <Toggle
              name="cancel"
              active={formData.cancel}
                onClick={() => handleToggleChange('cancel')}
                size="sm"
            />
          </div>
        </Form.Group>
      </Col>
        </Row>
        <Row><br></br><br></br></Row>
        <Row>
        <Button>Submit</Button>

        </Row>
        
      </Form>
    </Container>
  );
};

export default InputForm;
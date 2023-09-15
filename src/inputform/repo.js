<Col>
{/* Git Repository (Multiselect dropdown) */}
<Form.Group controlId="githubRepositories">
 <Form.Label>Git Repo</Form.Label>
 <Select
   isMulti
   options={[
     { value: 'Repo 1', label: 'Repo 1' },
     { value: 'Repo 2', label: 'Repo 2' },
     { value: 'Repo 3', label: 'Repo 3' },
   ]}
   value={formData.githubRepositories}
   onChange={(selectedOptions) => handleMultiSelectChange('githubRepositories', selectedOptions)}
 />
</Form.Group>
</Col>


const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData({ ...formData, [name]: selectedOptions });
  };
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Styles pour le Header et les liens de navigation
const Header = styled.header`
  background-color: #0474c4;
  color: white;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-size: 1rem;

  &.active {
    font-weight: bold;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  margin-left: 20px;
`;

// Style pour le contenu de la page
const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f8f3ef;
  min-height: 100vh;
`;

const Section = styled.section`
  background-color: #fffdf7;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: none;
  background-color: #0474c4;
  color: white;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #035a9e;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  input, select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
`;

const AdminWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [newWorkflow, setNewWorkflow] = useState({ name: '', status: 'Active' });
  const [editingWorkflow, setEditingWorkflow] = useState(null);

  useEffect(() => {
    // Simuler la récupération des workflows à partir de l'API
    setWorkflows([
      { id: 1, name: 'Workflow 1', status: 'Active' },
      { id: 2, name: 'Workflow 2', status: 'Inactive' },
    ]);
  }, []);

  const handleAddWorkflow = (e) => {
    e.preventDefault();
    const newId = workflows.length + 1;
    setWorkflows([...workflows, { id: newId, ...newWorkflow }]);
    setNewWorkflow({ name: '', status: 'Active' });
  };

  const handleEditWorkflow = (id) => {
    const workflow = workflows.find((wf) => wf.id === id);
    setEditingWorkflow(workflow);
  };

  const handleUpdateWorkflow = (e) => {
    e.preventDefault();
    setWorkflows(
      workflows.map((wf) => (wf.id === editingWorkflow.id ? editingWorkflow : wf))
    );
    setEditingWorkflow(null);
  };

  const handleDeleteWorkflow = (id) => {
    setWorkflows(workflows.filter((workflow) => workflow.id !== id));
  };

  return (
    <>
      <Header>
        <Title>Admin Dashboard</Title>
        <Nav>
          <NavLinkStyled to="/admin" className="active">Users</NavLinkStyled>
          <NavLinkStyled to="/documents">Documents</NavLinkStyled>
          <NavLinkStyled to="/workflows">Workflows</NavLinkStyled>
          <NavLinkStyled to="/login" onClick={() => alert('Logged out')}>Logout</NavLinkStyled>
        </Nav>
      </Header>

      <DashboardContainer>
        <Section>
          <h2>Manage Workflows</h2>

          <h3>Add a New Workflow</h3>
          <Form onSubmit={handleAddWorkflow}>
            <input
              type="text"
              placeholder="Workflow Name"
              value={newWorkflow.name}
              onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
              required
            />
            <select
              value={newWorkflow.status}
              onChange={(e) => setNewWorkflow({ ...newWorkflow, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <Button type="submit">Add Workflow</Button>
          </Form>

          {editingWorkflow && (
            <>
              <h3>Edit Workflow</h3>
              <Form onSubmit={handleUpdateWorkflow}>
                <input
                  type="text"
                  placeholder="Workflow Name"
                  value={editingWorkflow.name}
                  onChange={(e) =>
                    setEditingWorkflow({ ...editingWorkflow, name: e.target.value })
                  }
                  required
                />
                <select
                  value={editingWorkflow.status}
                  onChange={(e) =>
                    setEditingWorkflow({ ...editingWorkflow, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <Button type="submit">Update Workflow</Button>
              </Form>
            </>
          )}

          <Table>
            <thead>
              <tr>
                <th>Workflow Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((workflow) => (
                <tr key={workflow.id}>
                  <td>{workflow.name}</td>
                  <td>{workflow.status}</td>
                  <td>
                    <Button onClick={() => handleEditWorkflow(workflow.id)}>Edit</Button>
                    <Button onClick={() => handleDeleteWorkflow(workflow.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      </DashboardContainer>
    </>
  );
};

export default AdminWorkflows;

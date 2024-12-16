import React, { useState } from 'react';
import styled from 'styled-components';

// Style global du conteneur
const AdminContainer = styled.div`
  background-color: #f8f3ef;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// En-tête avec un style élégant
const Header = styled.header`
  background-color: #0474c4;
  color: #fff;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Contenu principal
const Content = styled.div`
  flex-grow: 1;
  padding: 2rem 5rem;
`;

// Section pour les tableaux et les formulaires
const Section = styled.section`
  background-color: #ffffff;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const FilterBox = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #fff;
`;

// Tableau
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  thead {
    background-color: #eaeaff;

    th {
      padding: 1rem;
      font-size: 1rem;
      font-weight: 600;
    }
  }

  tbody {
    tr {
      &:nth-child(odd) {
        background-color: #f8f3ef;
      }

      &:hover {
        background-color: #eef2fa;
      }

      td {
        padding: 1rem;
      }

      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #ffffff;
      }
    }
  }
`;

// Boutons
const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0474c4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #0474c4;
  }

  &.delete {
    background-color: #d9534f;

    &:hover {
      background-color: #c9302c;
    }
  }
`;

// Formulaire pour ajouter un type de document
const Form = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    padding: 0.7rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }

  button {
    flex-shrink: 0;
  }
`;

// Composant AdminDocuments
const AdminDocuments = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Invoice123.pdf',
      type: 'Invoice',
      status: 'Pending',
      summary: 'Invoice for order #123',
      uploadedBy: 'John Doe',
      manager: '',
    },
    {
      id: 2,
      name: 'Contract789.pdf',
      type: 'Contract',
      status: 'Approved',
      summary: 'Contract for client ABC',
      uploadedBy: 'Jane Smith',
      manager: '',
    },
  ]);

  const [managers] = useState(['Alice Johnson', 'Bob Martin', 'Charlie Adams']);
  const [newDocType, setNewDocType] = useState({ type: '', description: '' });
  const [filterType, setFilterType] = useState('');

  const handleAddDocumentType = (e) => {
    e.preventDefault();
    console.log('Added New Document Type:', newDocType);
    setNewDocType({ type: '', description: '' });
  };

  const handleDelete = (id) => {
    setDocuments((prevDocs) => prevDocs.filter((d) => d.id !== id));
  };

  const filteredDocuments = documents.filter(
    (doc) => filterType === '' || doc.type === filterType
  );

  return (
    <AdminContainer>
      {/* Header Section */}
      <Header>
        <Logo>Admin Dashboard</Logo>
        <Nav>
          <a href="/admin">Users</a>
          <a href="/documents">Documents</a>
          <a href="/workflows">Workflows</a>
          <a href="/login">Logout</a>
        </Nav>
      </Header>

      {/* Content */}
      <Content>
        {/* Tableau des documents */}
        <Section>
          <Title>Manage Documents</Title>
          <FilterBox
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Invoice">Invoice</option>
            <option value="Contract">Contract</option>
            <option value="Report">Report</option>
          </FilterBox>
          <Table>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Summary</th>
                <th>Uploaded By</th>
                <th>Manager</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.type}</td>
                  <td>{doc.status}</td>
                  <td>{doc.summary}</td>
                  <td>{doc.uploadedBy}</td>
                  <td>
                    <select
                      value={doc.manager}
                      onChange={(e) => {
                        const newManager = e.target.value;
                        setDocuments((prevDocs) =>
                          prevDocs.map((d) =>
                            d.id === doc.id ? { ...d, manager: newManager } : d
                          )
                        );
                      }}
                    >
                      <option value="">Select Manager</option>
                      {managers.map((manager) => (
                        <option key={manager} value={manager}>
                          {manager}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Button className="delete" onClick={() => handleDelete(doc.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>

        {/* Ajout d'un type de document */}
        <Section>
          <Title>Add New Document Type</Title>
          <Form onSubmit={handleAddDocumentType}>
            <input
              type="text"
              placeholder="Document Type"
              value={newDocType.type}
              onChange={(e) => setNewDocType({ ...newDocType, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newDocType.description}
              onChange={(e) =>
                setNewDocType({ ...newDocType, description: e.target.value })
              }
            />
            <Button type="submit">Add</Button>
          </Form>
        </Section>
      </Content>
    </AdminContainer>
  );
};

export default AdminDocuments;

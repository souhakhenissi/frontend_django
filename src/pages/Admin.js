import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const AdminContainer = styled.div`
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

const Title = styled.h2`
  color: #333;
`;

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

const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #0474c4;
  color: white;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 0.9rem;
  background-color: #0474c4;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-right:20px;

  &:hover {
    background-color: #045bb5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom:20px;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
  padding: 0.8rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Employee' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editingUser, setEditingUser] = useState(null); // Utilisé pour gérer l'édition d'un utilisateur

  // Fonction de déconnexion
  const logout = () => {
    console.log("Logging out...");
    // Code de déconnexion
  };

  // Fonction d'ajouter un utilisateur
  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', role: '' });
  };

  // Fonction de supprimer un utilisateur
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Fonction pour commencer l'édition d'un utilisateur
  const handleEditUser = (user) => {
    setEditingUser(user); // Déclenche l'affichage du formulaire d'édition
  };

  // Fonction pour sauvegarder les modifications d'un utilisateur
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setUsers(users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    ));
    setEditingUser(null); // Ferme le formulaire d'édition
  };

  return (
    <>
      <Header>
        <Title>Admin Dashboard</Title>
        <Nav>
          <NavLinkStyled to="/admin" className="active">Users</NavLinkStyled>
          <NavLinkStyled to="/documents">Documents</NavLinkStyled>
          <NavLinkStyled to="/workflows">Workflows</NavLinkStyled>
          <NavLinkStyled to="/login" onClick={logout}>Logout</NavLinkStyled>
        </Nav>
      </Header>

      <AdminContainer>
        <Section>
          <Title>Manage Users</Title>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Button onClick={() => handleEditUser(user)}>Edit</Button>
                    <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>

          {editingUser && (
            <div>
              <Title>Edit User</Title>
              <Form onSubmit={handleSaveEdit}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <Select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </Select>
                <Button type="submit">Save Changes</Button><br></br>
                <Button type="button" onClick={() => setEditingUser(null)}>Cancel</Button>
              </Form>
            </div>
          )}

          <Title>Add New User</Title>
          <Form onSubmit={handleAddUser}>
            <Input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </Select>
            <Button type="submit">Add User</Button>
          </Form>
        </Section>
      </AdminContainer>
    </>
  );
};

export default AdminDashboard;

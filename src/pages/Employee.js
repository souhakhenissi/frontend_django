import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'; // Import de NavLink pour le routage

// Container du tableau de bord
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

const Title = styled.h2`
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;
`;

const InputFile = styled.input`
  padding: 0.8rem;
  margin-top: 1rem;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  margin-top: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 0.9rem;
  background-color: #0474c4;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #045bb5;
  }
`;

const UploadMessage = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: ${(props) => (props.success ? '#47a47d' : '#ff3b3b')};
`;

const StatusSection = styled(Section)`
  background-color: #f0f4f9;
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

const InputSearch = styled.input`
  padding: 0.8rem;
  margin-top: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  width: 100%;
  border: 1px solid #ddd;
`;

// Header et Menu
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

// Composant principal du dashboard
const EmployeeDashboard = () => {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Données des documents pour exemple
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Contract.pdf', status: 'Approved', history: ['Uploaded by Employee', 'Validated by Manager'] },
    { id: 2, name: 'Invoice.docx', status: 'Pending', history: ['Uploaded by Employee'] },
  ]);

  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  const documentTypeSuggestions = ['Invoice', 'Contract', 'Report', 'Purchase Order', 'Receipt'];

  // Fonction de changement de fichier
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Simuler la classification du type de document
    classifyDocumentType(selectedFile).then((type) => {
      setDocumentType(type);
    });
  };

  // Fonction pour simuler la classification du type de document
  const classifyDocumentType = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const types = ['Invoice', 'Contract', 'Report', 'Purchase Order', 'Receipt'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        resolve(randomType);
      }, 1000);
    });
  };

  // Fonction de filtre des documents par recherche
  const filterDocuments = () => {
    setFilteredDocuments(
      documents.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  // Fonction de soumission du formulaire d'upload
  const uploadDocument = (event) => {
    event.preventDefault();
    if (documentType) {
      setUploadMessage('Document uploaded successfully!');
      setIsUploadSuccess(true);
    } else {
      setUploadMessage('Please select a document type.');
      setIsUploadSuccess(false);
    }
  };

  return (
    <>
      <Header>
        <Title>DocFlow Platform</Title>
        <Nav>
          <NavLinkStyled to="/home">Home</NavLinkStyled> {/* Lien vers la page d'accueil */}
          <NavLinkStyled to="/login">Logout</NavLinkStyled> {/* Lien vers logout */}
        </Nav>
      </Header>

      <DashboardContainer>
        <Section className="upload-section">
          <Title>Upload Document</Title>
          <Form onSubmit={uploadDocument}>
            <Label htmlFor="document">Select Document:</Label>
            <InputFile type="file" id="document" onChange={handleFileChange} />

            <Label htmlFor="document-type">Document Type:</Label>
            <Select
              id="document-type"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="" disabled>Select a Document Type</option>
              {documentTypeSuggestions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>

            <Button type="submit">Upload</Button>
            {uploadMessage && (
              <UploadMessage success={isUploadSuccess}>{uploadMessage}</UploadMessage>
            )}
          </Form>
        </Section>

        <StatusSection className="status-section">
          <Title>Document Status</Title>
          <InputSearch
            type="text"
            placeholder="Search by document name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              filterDocuments();
            }}
          />

          {filteredDocuments.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <Th>Document Name</Th>
                  <Th>Status</Th>
                  <Th>Action History</Th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <Td>{doc.name}</Td>
                    <Td>{doc.status}</Td>
                    <Td>
                      <ul>
                        {doc.history.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No documents found matching your search.</p>
          )}
        </StatusSection>
      </DashboardContainer>
    </>
  );
};

export default EmployeeDashboard;

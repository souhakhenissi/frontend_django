import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Simuler les données des workflows et documents
const initialWorkflows = [
  { id: 1, name: "Validation des factures", status: "En cours", assignedTo: "Manager", documents: ["Facture 1", "Facture 2"] },
  { id: 2, name: "Contrats à approuver", status: "En attente", assignedTo: "Manager", documents: ["Contrat A", "Contrat B"] }
];

const initialDocuments = [
  { id: 1, name: "Facture 1", type: "Facture", status: "En attente", workflowId: 1 },
  { id: 2, name: "Contrat A", type: "Contrat", status: "Rejeté", workflowId: 2 }
];

// Styled-components pour la navigation
const Header = styled.header`
  width: 100%;
  background-color: #0474c4;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 30px; // Donne un petit espace en dessous du header
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.8rem;
  margin-left: 20px;
`;

const Nav = styled.nav`
  margin-left: auto;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  padding: 0 15px;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Styled-components pour le reste du dashboard
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin-top: 30px;
  text-align: center;
  color: #34495e;
`;

const WorkflowCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: ${props => (props.primary ? '#4CAF50' : '#3498db')};
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  margin-top: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.primary ? '#45a049' : '#2980b9')};
  }
`;

const DocumentDetail = styled.div`
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DocumentItem = styled.div`
  margin-bottom: 10px;
`;

const ReportsButton = styled(Button)`
  background-color: #f39c12;

  &:hover {
    background-color: #e67e22;
  }
`;

// Composant principal
const Manager = () => {
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [documents, setDocuments] = useState(initialDocuments);
  const [activeDocument, setActiveDocument] = useState(null);

  const updateDocumentStatus = (documentId, newStatus) => {
    setDocuments(prevDocs => prevDocs.map(doc =>
      doc.id === documentId ? { ...doc, status: newStatus } : doc
    ));
  };

  const modifyWorkflow = (workflowId, newName) => {
    setWorkflows(prevWorkflows => prevWorkflows.map(workflow =>
      workflow.id === workflowId ? { ...workflow, name: newName } : workflow
    ));
  };

  const getDocumentsForWorkflow = (workflowId) => {
    return documents.filter(doc => doc.workflowId === workflowId);
  };

  const generateReport = () => {
    const report = workflows.map(workflow => ({
      name: workflow.name,
      status: workflow.status,
      documentCount: getDocumentsForWorkflow(workflow.id).length
    }));
    alert(JSON.stringify(report, null, 2)); // Afficher le rapport
  };

  return (
    <DashboardContainer>
      {/* Header avec la barre de navigation */}
      <Header>
        <Title>Manager Dashboard</Title>
        <Nav>
          <NavLink to="/home">Home</NavLink> {/* Lien vers la page d'accueil */}
        </Nav>
      </Header>
      
      {/* Section des workflows */}
      <div className="workflows">
        <SectionTitle>Manage The Workflows</SectionTitle>
        {workflows.map(workflow => (
          <WorkflowCard key={workflow.id}>
            <h3>{workflow.name}</h3>
            <p>Status : {workflow.status}</p>
            <Button primary onClick={() => modifyWorkflow(workflow.id, "Workflow modifié")}>Modifier Workflow</Button>
            <div>
              <h4>Documents :</h4>
              {getDocumentsForWorkflow(workflow.id).map(doc => (
                <DocumentItem key={doc.id}>
                  <span>{doc.name} - {doc.status}</span>
                  <Button onClick={() => setActiveDocument(doc)}>Voir</Button>
                </DocumentItem>
              ))}
            </div>
          </WorkflowCard>
        ))}
      </div>

      {/* Section des documents */}
      <div className="documents">
        <SectionTitle>Documents</SectionTitle>
        {activeDocument && (
          <DocumentDetail>
            <h3>{activeDocument.name}</h3>
            <p>Type : {activeDocument.type}</p>
            <p>Status : {activeDocument.status}</p>
            <Button primary onClick={() => updateDocumentStatus(activeDocument.id, "Approuvé")}>Approuver</Button>
            <Button onClick={() => updateDocumentStatus(activeDocument.id, "Rejeté")}>Rejeter</Button>
          </DocumentDetail>
        )}

        <SectionTitle>Reports</SectionTitle>
        <ReportsButton onClick={generateReport}>Générer Rapport</ReportsButton>
      </div>
    </DashboardContainer>
  );
};

export default Manager;

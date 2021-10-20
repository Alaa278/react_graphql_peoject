import React from "react";
import { useQuery, gql } from "@apollo/react-hooks";
import { Table, Button } from "semantic-ui-react";

const Home = (props) => {
  const { loading, data } = useQuery(GET_LISTPICKUPS_QUERY,{
    fetchPolicy: "network-only"
  });
  if (data) console.log("pickup data=========", data);
  const buttonHandler=() => {
    props.history.push('/addPickup')
  }
  return (
    <div style={{margin:"20px auto"}}>
      <Button primary onClick={buttonHandler}>Add pickup</Button>
      {loading ? (
          <h5>loading data.......</h5>
        ) : (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Branch Name</Table.HeaderCell>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
            <Table.HeaderCell>Shipments Count</Table.HeaderCell>
            <Table.HeaderCell>Status Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        
          {data &&
          data.listPickups.data.map((pickup,index) => (
            <Table.Body key={index} >
              <Table.Row>
                <Table.Cell>{pickup.branch.name}</Table.Cell>
                <Table.Cell> {pickup.code} </Table.Cell>
                <Table.Cell> {pickup.notes} </Table.Cell>
                <Table.Cell>{pickup.shipmentsCount}</Table.Cell>
                <Table.Cell>{pickup.status.name}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
          }
      </Table>
      )}
    </div>
  );
};

export default Home;
const GET_LISTPICKUPS_QUERY = gql`
  query {
    listPickups {
      data {
        notes
        shipmentsCount
        code
        status {
          name
        }
        branch {
          name
        }
      }
    }
  }
`;

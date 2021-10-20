import React, {useState} from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/react-hooks";

const AddPickup = (props) => {
    
    const [values, setValues] = useState({
        timeFrom: "",
        timeTo: "",
        shipmentsCount: "",
        notes: "",
      });
      const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };
      const [addPickup, { loading }] = useMutation(ADD_PICKUP, {
        onCompleted: (data) => {
        props.history.push("/home")
        }  
      });
      const onSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        addPickup({
          variables: {
            input: {
              timeFrom: values.timeFrom,
              timeTo: values.timeTo,
              shipmentsCount: parseInt(values.shipmentsCount),
              notes: values.notes,
            },
          },
        });
      };
    

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h1>Add Pickup</h1>
        <Form.Input
          label="timeFrom "
          placeholder="timeFrom ..."
          name="timeFrom"
          type="text"
          value={values.timeFrom}
          onChange={onChange}
        />
        <Form.Input
          label="timeTo"
          placeholder="timeTo..."
          name="timeTo"
          type="text"
          value={values.timeTo}
          onChange={onChange}
        />
        <Form.Input
          label="shipmentsCount "
          placeholder="shipmentsCount..."
          name="shipmentsCount"
          type="number"
          value={values.shipmentsCount}
          onChange={onChange}
        />
        <Form.Input
          label="notes  "
          placeholder="notes ..."
          name="notes"
          type="text"
          value={values.notes }
          onChange={onChange}
        />
        <Button type="submit" primary>
          Add
        </Button>
      </Form>
    </div>
  );
};

const ADD_PICKUP = gql`
  mutation savePickup($input: PickupInput!) {
    savePickup(input: $input) {
      id
      code
      timeFrom
      timeTo
      notes
      shipmentsCount
      createdAt
      pickedAt
      status {
        code
        name
      }
      branch {
        id
        name
        main
      }
      customer {
        id
        active
        code
        name
        zone {
          id
          name
        }
        subzone {
          id
          name
        }
      }
      deliveryAgent {
        id
        name
        active
      }
    }
  }
`;

export default AddPickup;

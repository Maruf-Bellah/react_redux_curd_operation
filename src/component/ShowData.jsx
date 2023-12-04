import React, { useEffect } from "react";
import {
  useGetLeaveQuery,
  useRemoveLeaveTypeMutation,
} from "../feature/apiSliceServer";
import { Badge, Table } from "react-bootstrap";
import EditData from "./EditData";

const ShowData = () => {
  const { data, error, isLoading } = useGetLeaveQuery();
  const [RemoveLeaveType] = useRemoveLeaveTypeMutation();

  const deleteData = (id) => {
    if (confirm("Are your sure you want to delete ? ")) {
      RemoveLeaveType(id);
    }
    // window.location.reload();
  };
  useEffect(() => {
    deleteData;
  }, []);
  return (
    <div>
      {error ? (
        <p className="text-danger">Oh no, there was an error</p>
      ) : isLoading ? (
        <h3>Loading...</h3>
      ) : data ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            {data?.data?.map((elem, key) => (
              <tbody key={key}>
                <tr>
                  <td>{elem.name}</td>
                  <td>{elem.status}</td>
                  <td>{elem.updatedAt}</td>
                  <td>
                    <Badge
                      onClick={() => deleteData(elem._id)}
                      style={{ cursor: "pointer" }}
                      pill
                      bg="danger"
                    >
                      Delete
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      style={{ cursor: "pointer" }}
                      pill
                      bg="primary"
                    ></Badge>
                    <EditData passData={elem}></EditData>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      ) : null}
    </div>
  );
};

export default ShowData;

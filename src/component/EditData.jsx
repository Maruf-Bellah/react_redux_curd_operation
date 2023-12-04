import React from "react";
import { useState } from "react";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEditLeaveMutation } from "../feature/apiSliceServer";

const EditData = ({ passData }) => {
  // console.log(passData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editElem, setEditElem] = useState(passData);

  const [editLeave] = useEditLeaveMutation();

  const makeDataObject = yup
    .object({
      name: yup.string().required(),
      status: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(makeDataObject),
  });
  const onSubmit = (data) => {
    data.store = "6566e648a8d45ce8cf3f0f6b";
    data._id = `${passData?._id}`;
    data.type = `${passData.type}`;
    editLeave({ data});

    console.log(data);
  };

  return (
    <div>
      <Badge
        onClick={handleShow}
        style={{ cursor: "pointer" }}
        pill
        bg="primary"
      >
        EditData
      </Badge>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div className="col-12">
              <input
                {...register("name")}
                value={editElem?.name}
                onChange={(e) => {
                  setEditElem({ ...editElem, name: e.target.value });
                }}
                className="form-control"
                placeholder="Name"
              />
              {/* <p>{errors.firstName?.message}</p> */}
            </div>
            <div className="col-12">
              <select
                {...register("status")}
                value={editElem?.status}
                onChange={(e) => {
                  setEditElem({ ...editElem, status: e.target.value });
                }}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
            <div className="col-12">
              <Button className="me-3 " variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditData;

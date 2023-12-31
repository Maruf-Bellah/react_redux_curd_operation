import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddLeaveMutation } from "../feature/apiSliceServer";

const OpenModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [AddLeave, { isLoading, errors }] = useAddLeaveMutation();

  const makeDataObject = yup
    .object({
      name: yup.string().required(),
      status: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(makeDataObject),
  });
  const onSubmit = (data) => {
    data.store = "6566e648a8d45ce8cf3f0f6b";
    AddLeave(data);
    console.log(data);
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Please Open modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div className="col-12">
              <input
                {...register("name")}
                className="form-control"
                placeholder="Name"
              />
              {/* <p>{errors.firstName?.message}</p> */}
            </div>
            <div className="col-12">
              <select
                {...register("status")}
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

export default OpenModal;

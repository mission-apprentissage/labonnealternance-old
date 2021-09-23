import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useFormik } from 'formik';

const CandidatureSpontanee = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="c-candidature">

      <div className="c-detail-description-me col-12 col-md-5">
        <div className="c-detail-pelink my-3">
          <Button onClick={toggle} className="btn btn-dark ml-1">
                J’envoie une candidature spontanée
          </Button>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={"c-candidature-modal"}>
        <form onSubmit={formik.handleSubmit}>
            <ModalHeader toggle={toggle} className={"c-candidature-modal-header"}></ModalHeader>
            <ModalBody>
              <h1 className="c-candidature-title">Candidature spontanée</h1>
              
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            </ModalBody>
            <ModalFooter>
              <button className="btn btn-dark btn-dark-action" type="submit">Submit</button>
            </ModalFooter>
          </form>
      </Modal>
    </div>
  );
}

export default CandidatureSpontanee;

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useFormik } from 'formik';

const CandidatureSpontanee = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      toggle();
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor   incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                <Button type="submit" color="btn btn-dark btn-dark-action" onClick={toggle}>Je postule</Button>{' '}
                <button type="submit">Submit</button>
            </ModalFooter>
          </form>
      </Modal>
    </div>
  );
}

export default CandidatureSpontanee;

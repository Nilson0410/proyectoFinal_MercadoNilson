import { useState } from "react";

import { Camisa } from "../../modelos/Camisa";
import { ARREGLO_CAMISAS } from "../../mocks/Camisa-mocks";
import { ARREGLO_CAMISA_MARCA } from "../../utilidades/dominios/DomMarca";
import { NavLink } from "react-router-dom";
import { Button, Modal, ModalHeader } from "react-bootstrap";

export const CamiAdmin = () => {
  const [arrCamisas] = useState<Camisa[]>(ARREGLO_CAMISAS);
  const [objCami, setObjCami] = useState<Camisa>(
    new Camisa(0, "", "", "", "", "")
  );
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };

  const obtenerNombreMarca = (valor: string) => {
    for (const objMarc of ARREGLO_CAMISA_MARCA) {
      if (objMarc.codMarca == valor) {
        return objMarc.nombreMarca;
      }
    }
  };
  const eliminarCamisa = (codigo: number) => {
    const cantidad = arrCamisas.length;

    for (let i = 0; i < cantidad; i++) {
      if (arrCamisas[i] != undefined) {
        const comparar = arrCamisas[i].codCamisa;

        if (comparar == codigo) {
          arrCamisas.splice(i, 1);
        }
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-11 mt-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-danger">
                <th style={{ width: "10%" }}>Nro</th>
                <th style={{ width: "30%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Marca</th>
                <th style={{ width: "20%" }}>Talla</th>
                <th style={{ width: "10%" }}>Imagen</th>
                <th style={{ width: "10%" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {arrCamisas.map((miCami: Camisa) => (
                <tr className="align-middle" key={miCami.codCamisa}>
                  <td>{miCami.codCamisa}</td>
                  <td>{miCami.nombreCamisa}</td>
                  <td>{obtenerNombreMarca(miCami.codMarcaCamisa)}</td>
                  <td>{miCami.tallaCamisa}</td>
                  <td>
                    <img
                      src={miCami.imagenCamisaBase64}
                      alt=""
                      className="imagenListado"
                    />
                    <div className="text-info">{miCami.imagenCamisa} </div>
                  </td>
                  <td className="text-center">
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShow(true);
                        setObjCami(miCami);
                      }}
                    >
                      <i className="fa-solid fa-trash-can rojito"></i>
                    </a>{" "}
                    <NavLink to={"/pactual/" + miCami.codCamisa}>
                      <i className="fa-regular fa-pen-to-square verde"></i>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader closeButton>
              <Modal.Title>Eliminar Camisa</Modal.Title>
            </ModalHeader>

            <Modal.Body>
              ¿Esta seguro de eliminar la camisa {objCami.nombreCamisa}?
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={(e) => {
                  setShow(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  eliminarCamisa(objCami.codCamisa);
                  setShow(false);
                }}
              >
                {" "}
              </Button>
              Eliminar
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

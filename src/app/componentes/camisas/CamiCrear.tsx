import Form from "react-bootstrap/Form";
import noFoto from "../../../assets/img/noDisponible.png";
import React, { useState } from "react";
import { Camisa } from "../../modelos/Camisa";
import { ARREGLO_CAMISAS } from "../../mocks/Camisa-mocks";
import { CamisaMarca } from "../../modelos/CamisaMarca";
import { ARREGLO_CAMISA_MARCA } from "../../utilidades/dominios/DomMarca";
import { useFormulario } from "../../utilidades/misHooks/useFormulario";
import { useNavigate } from "react-router-dom";
import { ConvertirBase64 } from "../../utilidades/funciones/ConvertirBase64";

export const CamiCrear = () => {
  const irsePara = useNavigate();

  type formHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [imgBase64, setImgBase64] = useState<any>();
  const [imgMiniatura, setImgMiniatura] = useState<any>(noFoto);

  const [arrCamisas] = useState<Camisa[]>(ARREGLO_CAMISAS);
  const [arrMarcas] = useState<CamisaMarca[]>(ARREGLO_CAMISA_MARCA);

  let {
    nombreCamisa,
    codMarcaCamisa,
    tallaCamisa,
    imagenCamisa,
    dobleEnlace,
    objeto,
  } = useFormulario<Camisa>(new Camisa(0, "", "", "", "", ""));

  const enviarForm = (objForm: formHtml) => {
    objForm.preventDefault();
    const formulario = objForm.currentTarget;

    if (formulario.checkValidity() === false) {
      objForm.preventDefault();
      objForm.stopPropagation();
      setEnProceso(true);
    } else {
      const ultimaCami = arrCamisas[arrCamisas.length - 1];
      const nuevoNumero = ultimaCami.codCamisa + 1;
      objeto.codCamisa = nuevoNumero;
      objeto.imagenCamisa = imagenCamisa.substring(
        imagenCamisa.lastIndexOf("\\") + 1
      );
      objeto.imagenCamisaBase64 = imgBase64;
      arrCamisas.push(objeto);
      setEnProceso(false);
      irsePara("/camlist");
    }
  };

  const cargarImagen = async (e: any) => {
    const archivos = e.target.files;
    const imagen = archivos[0];
    setImgMiniatura(URL.createObjectURL(imagen));
    dobleEnlace(e);
    const base64 = await ConvertirBase64(imagen);
    setImgBase64(base64);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-5 mt-5 pb-4">
        <Form noValidate validated={enProceso} onSubmit={enviarForm}>
          <div className="card">
            <div className="card-header">
              <h5 className=" rojito">Formulario creación</h5>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <Form.Group controlId="nom">
                  <Form.Label>
                    <span className="rojito">*</span> Nombre Camisa
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    required
                    type="text"
                    name="nombreCamisa"
                    value={nombreCamisa}
                    onChange={dobleEnlace}
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="tall">
                  <Form.Label>
                    <span className="rojito">*</span> Talla
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    required
                    type="text"
                    name="tallaCamisa"
                    value={tallaCamisa}
                    onChange={dobleEnlace}
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="marc">
                  <Form.Label>
                    <span className="rojito">*</span> Marca
                  </Form.Label>

                  <Form.Select
                    size="sm"
                    required
                    name="codMarcaCamisa"
                    value={codMarcaCamisa}
                    onChange={dobleEnlace}
                  >
                    <option value="">Seleccione una Marca</option>

                    {arrMarcas.map((miMacrca: CamisaMarca) => (
                      <option value={miMacrca.codMarca} key={miMacrca.codMarca}>
                        {miMacrca.nombreMarca}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="fot">
                  <Form.Label>
                    <span className="rojito">*</span> Imágen
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    required
                    type="file"
                    name="imagenCamisa"
                    value={imagenCamisa}
                    onChange={cargarImagen}
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-center">
                  <img
                    src={imgMiniatura}
                    alt="no foto"
                    className="maximoTamanoCreacion"
                  />
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Crear Camisa
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

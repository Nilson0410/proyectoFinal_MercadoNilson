import { useState } from "react";
import { Camisa } from "../../modelos/Camisa";
import { ARREGLO_CAMISAS } from "../../mocks/Camisa-mocks";
import { ARREGLO_CAMISA_MARCA } from "../../utilidades/dominios/DomMarca";

export const CamiListar = () => {
  const [arrCamisas] = useState<Camisa[]>(ARREGLO_CAMISAS);

  const obtenerNombreMarca = (valor: string) => {
    for (const objMarc of ARREGLO_CAMISA_MARCA) {
      if (objMarc.codMarca == valor){
        return objMarc.nombreMarca;
      }
    }
  }

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
                <th style={{ width: "30%" }}>Talla</th>
                <th style={{ width: "10%" }}>Imagen</th>
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
                  <img src={miCami.imagenCamisaBase64} alt="" className="imagenListado" />
                  <div className="text-info">{miCami.imagenCamisa}</div>
                </td>
              </tr>                    
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

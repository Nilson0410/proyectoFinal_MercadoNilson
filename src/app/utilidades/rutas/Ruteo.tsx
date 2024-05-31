import { Route, Routes } from "react-router-dom";

import { Inicio } from "../../componentes/contenedor/Inicio";
import { AcercaDe } from "../../componentes/otros/AcercaDe";
import { NoEncontrado } from "../../componentes/contenedor/NoEnconado";

import { CamiCrear } from "../../componentes/camisas/CamiCrear";
import { CamiListar } from "../../componentes/camisas/CamiListar";
import { CamiAdmin } from "../../componentes/camisas/CamiAdmin";
import { CamiActualizar } from "../../componentes/camisas/CamiActualizar";

export const Ruteo =() =>{
    return(
        <Routes>
            <Route path="/" element={<Inicio />}/>

            <Route path="/camcre" element={<CamiCrear />}/>
            <Route path="/camlist" element={<CamiListar />}/>
            <Route path="/camadm" element={<CamiAdmin />}/>

            <Route path="/camact/:codigo" element={<CamiActualizar />}/>
            
            <Route path="/acerca" element={<AcercaDe />}/>
            
            <Route path="*" element={<NoEncontrado />}/>
        </Routes>
    )
}
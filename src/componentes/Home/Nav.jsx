import React from 'react';
import es from '../../assets/es.png';
import uk from '../../assets/uk.png';
import lupa from '../../assets/lupa.png'
import icono from '../../assets/casa.png';
import vector from '../../assets/Vector.png'
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Nav = ({func, casa, buscador, atras, busca}) => {
  const { t } = useTranslation();

  return (
    <nav className='nav'>
      <div className={`${buscador ? 'container-nav' : 'container-nav-buscador'}`}>
          <div className='container-vector'>
          {atras &&  
            <>
              <div>
                <NavLink to="/personajes">           
                <img src={vector} className='vector' alt="" />
                </NavLink>
              </div>            
              <span>Atras</span>
            </>
          }
          {buscador &&  
            <>           
              <div>
                <img src={lupa} className='lupa' alt="" />
              </div>            
            <input className='buscador' type="text" placeholder='Buscar...' onChange={(event) => {busca(event.target.value)} }/>
            </>
          }
            
          </div>
          <div className='container-flags'>
            {casa && <NavLink to="/"> <img className="casa" src={icono} alt="icono casa"/> </NavLink> }
            <img className="flag" src={es} alt="bandera española" onClick={ () => func('es') }   />
            <img className="flag" src={uk} alt="bandera inglesa"  onClick={ () => func('en') }  />
          </div>
      </div>
    </nav>
  )
}

export default Nav;
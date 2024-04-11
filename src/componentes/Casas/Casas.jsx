import React, { useState, useEffect } from 'react';
import Pages from '../Home/Pages';
import Nav from '../Home/Nav';
import i18n from 'i18next';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import { NavLink } from 'react-router-dom';
import './casas.css';

export default function Casas(){
  const [casas, setCasas] = useState([]);

  const cambiarIdioma = (idiom) => {
    i18n.changeLanguage(idiom);
  }

  useEffect( () => {
    getHouses();
  },[])

  const getHouses = async() => {
    const res = await axios('https://db-go-t.vercel.app/houses');
    console.log(res.data);
    setCasas(res.data);    
  }

  const buscando = async(input) => {
    console.log(input);
    const res = await axios('https://db-go-t.vercel.app/houses');
    const filtrados = res.data.filter((x) => {
      if(x.name.toLowerCase().trim().includes(input.toLowerCase().trim())){
        return x; 
      }
    });
    setCasas(filtrados);
  }

  return (
    <div className='container-casas'>
      <Nav func={cambiarIdioma} casa={true} buscador={true} busca={buscando}/>
        <div className='casas'>
        <SimpleBar style={{ height: '75vh', color:'white', width:'100%' }} className='custom-scrollbar'>
        <div className="inner-content" style={{ display: 'flex', gap:'10px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {casas.map((casa, index) => (
              <NavLink to={"/casa/"+casa.id} key={index}>
                {/*backgroundImage: `url(${personaje.image})`,*/}
              <div className='casa-escudo'  style={
                {
                position:'relative',
                display: 'flex',
                flexDirection:'column',
                alignItems:'flex-end'
                }}>
                <img className="escudo" src={casa.image} alt="" />
                <div className='escudo-nombre'>
                  <p style={{textAlign:'center'}}>
                    {casa.name}
                  </p>                  
                </div>
                {/*<div className='overlay'>
                  <div className='nombre'>
                  <p>
                    {casa.name}
                  </p>
                  </div>

                </div> */}
              </div>
              </NavLink>
              
            ))}
          </div>
        </SimpleBar>
        </div>
      <Pages/>
    </div>
  )
}

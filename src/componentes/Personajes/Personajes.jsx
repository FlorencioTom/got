import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '../Home/Nav';
import Pages from '../Home/Pages';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import './personajes.css';

const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);

  useEffect( () => {
    getCharacters();
  },[])

  const { t } = useTranslation();

  const cambiarIdioma = (idiom) => {
      i18n.changeLanguage(idiom);
  }

  const getCharacters = async() => {
    const res = await axios('https://db-go-t.vercel.app/characters');
    console.log(res.data);
    setPersonajes(res.data);
  }

  const buscando = async(input) => {
    console.log(input);
    const res = await axios('https://db-go-t.vercel.app/characters');
    const filtrados = res.data.filter((x) => {
      if(x.name.toLowerCase().trim().includes(input.toLowerCase().trim())){
        return x; 
      }
    });
    setPersonajes(filtrados);
  }

  return (
    <>
    <div className='container-personajes'>
      <Nav func={cambiarIdioma} casa={true} buscador={true} busca={buscando}/>
        <div className='personajes'>
        <SimpleBar style={{ height: '75vh', color:'white' }} className='custom-scrollbar'>
        <div className="inner-content" style={{ display: 'flex', gap:'10px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {personajes.map((personaje, index) => (
              <NavLink to={"/personaje/"+personaje.id} key={index}>
              <div className='personaje'  style={
                {
                backgroundImage: `url(${'./src/assets'+personaje.image})`,
                position:'relative',
                display: 'flex',
                flexDirection:'column',
                alignItems:'flex-end'
                }}>
                <div className='overlay'>
                  <div className='nombre'>
                  <p>
                    {personaje.name}
                  </p>
                  </div>

                </div>
              </div>
              </NavLink>
              
            ))}
        </div>
        </SimpleBar>
        </div>
        <Pages/>
    </div>
    
    </>
  )
}

export default Personajes;

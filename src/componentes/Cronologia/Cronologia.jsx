import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '../Home/Nav';
import Pages from '../Home/Pages';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import './cronologia.css';

export default function Cronologia() {

  const [personajes, setPersonajes] = useState([]);

  useEffect( () => {
    getCharacters();
  },[]);

  const getCharacters = async() => {
    const res = await axios('https://db-go-t.vercel.app/characters');
    const sortedCharacters = res.data.sort((a, b) => a.age - b.age);
    console.log(sortedCharacters);
    setPersonajes(sortedCharacters);
  }

  const cambiarIdioma = (idiom) => {
    i18n.changeLanguage(idiom);
  }

  return (
    <div className='container-cronologia'>
    <Nav func={cambiarIdioma} casa={true} buscador={false} />
    <SimpleBar style={{ height: '75vh', color:'white' }} className='custom-scrollbar'>

    <div className='cronologia'>
    <div className="iz">
        {
          personajes.map((per, i) => {
            if(i%2 === 0){
              return (
                <div key={i} className='crono-container'>
                  <span>{per.age}</span>
                  <span>{per.name}</span>
                  <div className='img-container'>
                    <img src={'./src/assets'+per.image} className='pers-crono'/>
                  </div>               
                </div>                 
              )
            }             
          })
        }
      </div>
      
      <div className="der">
      {
        personajes.map((per, i) => {
          if(i%2 !== 0){
            return (
              <div key={i} className='crono-container'>
                <span>{per.age}</span>
                <span>{per.name}</span>
                <div className='img-container'>
                  <img src={'./src/assets'+per.image} className='pers-crono'/>
                </div>               
              </div>                 
            )
          }             
        })
      }        
      </div>
    </div>
      </SimpleBar>
      <Pages/>
    </div>
  )
}

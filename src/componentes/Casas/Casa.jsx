import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../Home/Nav';
import Pages from '../Home/Pages';
import i18n from 'i18next';
import axios from 'axios';
import '../Personajes/personajes.css';

export default function Casa() {
    const [casa, setCasa] = useState([]);

    let { id } = useParams();
    const { t } = useTranslation();

    useEffect( () => {
      getHouses();
      //getHouses();
    },[]);

    const getHouses = async() => {
        const res = await axios('https://db-go-t.vercel.app/houses');
        const miCasa = res.data.filter((x) => {
            return x.id == id;
        });
        console.log(miCasa);
        setCasa(miCasa); 
    }

    const cambiarIdioma = (idiom) => {
        i18n.changeLanguage(idiom);
    }
    
    return (
        <div className='container-casas'>
            <Nav func={cambiarIdioma} casa={true} buscador={false} atras={true}/>
            {
                casa.map((casa, i) => {
                    console.log(casa);
                    return (
                        <div key={i}>
                            <img className="foto-escu" key={i} src={'../src/assets'+casa.image}/>
                            <p className='text-carac'> {t('house') +' - '+casa.name} </p>
                        </div>
                    )
                })                
            }
            {
                casa.map((casa, i) => {
                    console.log(casa);
                    return (
                        <div className='caracteristicas' key={i}>
                             <div className='caracteristica'>
                                <p className='text-carac'> {t('foundation')}</p>
                                {
                                    <p className='sub-carac'>{casa.foundation}</p>
                                }                               
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('region')}</p>
                                {
                                    <p className='sub-carac'>{casa.region}</p>
                                }                               
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('religion')}</p>
                                <p className='sub-carac'>
                                {
                                    casa.religions.map((rel, i) => {
                                        return (rel)
                                    })
                                }  
                                </p>                             
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('alliances')}</p>
                                {
                                    casa.alliances.map((rel, i) => {
                                        return (
                                            <p className='sub-carac' key={i}> {rel} </p>
                                        )
                                    })
                                }                                                             
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('settlement')}</p>
                                <p className='sub-carac'>
                                {
                                    casa.settlement
                                }  
                                </p>                                                             
                            </div>
                        </div>
                    )
                })                
            }
            <Pages/>
        </div> 
    )
}

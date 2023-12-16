import Cargando from '@/components/login/Cargando';
import useAuth from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogOut = () => {

    const navigate = useNavigate()
    const {handleCargando} = useAuth()

    useEffect(() => {
    handleCargando()
      localStorage.removeItem('token')
      Cookies.remove("autentication", { path: "/", domain: "datapredictor.solutions" });
      navigate('/')
    handleCargando()

    }, []);

  return (
    <Cargando/>
  )
}

export default LogOut
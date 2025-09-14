import { useNavigate } from "react-router-dom"
import logo from './../assets/LOGO.png'

export default function Header(){
    sessionStorage.setItem("id_rol", "")
    const rol = sessionStorage.getItem("id_rol")

    const navigate =useNavigate()

    function Logout(){
        sessionStorage.setItem("id_rol","")
    }
    function byebye(){
        Logout()
        navigate("/")
    } 

    return(
        <div id="header" className="w-full flex flex-row justify-evenly bg-verde1 h-[100px] w-full items-center"> 
            <div className="w-3/12 items-center justify-evenly">
                <img src={logo} alt="" />
            </div>
            <div className="w-6/12 b-2 b-white">
                <h1 className='text-center text-white font-bold text-xl'>Sistema DIMISA <br/>Dosis, Insumos, Medicamentos, Inventario,<br/>Seguimiento, Administración</h1>
            </div>
            <div className="w-3/12 flex justify-end">
            {
                rol!=="" &&(

                    <h4 className='text-white ' onClick={byebye}>Cerrar sesión</h4>
                )
            }
            </div>            
        </div>
    )
}
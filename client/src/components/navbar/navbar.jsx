import React, {useState, useEffect} from 'react'
import {Link, useLocation,useNavigate} from "react-router-dom"
import './navbar.scss'
import noavatar from "../../../public/img/noavatar.jpg"
import newRequest from '../../utils/newRequest'
function Navbar() {
    const [active,setActive] =useState(false)
    const [open,setOpen] =useState(false)
    const {pathname} = useLocation()
    const navigate = useNavigate();
    const isActive =()=>{
        window.scrollY>0 ? setActive(true):setActive(false)
    }
    useEffect(()=>{
        window.addEventListener("scroll",isActive);
        return ()=>{
            window.removeEventListener("scroll",isActive)
        }
        // sta3mlna addeventlistner pourtant mali9sh nsta3mloha m3a react cuz react mayshish bl dom ymshi bl components cuz rana nshofo scroll ta3 window like window mosh components hada 3lah ista3malna addeventlistner
    },[])
    const currentUser=JSON.parse(localStorage.getItem("currentUser"))
    const handleLogout = async ()=>{
      try {
        await newRequest.post("/auth/logout")
        localStorage.setItem("currentUser",null)
        Navigate("/")

      } catch (error) {
        
      }
    }
    return (
      <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
        <div className="container">
          <div className="logo">
            <Link className="link" to="/">
              <span className="text">Fiverr</span>
            </Link>
            <span className="dot">.</span>
          </div>
          <div className="links">
            <span>Fiverr Business</span>
            <span>Explore</span>
            <span>English</span>
            {!currentUser?.isSeller && <span>Become a Seller</span>}
            {currentUser ? (
              <div className="user" onClick={()=>setOpen(!open)}>
                <img
                  src={currentUser.img || noavatar}
                />
                <span>{currentUser?.username}</span>
                {open && <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>}
              </div>
            ) : (
              <>
                <Link to="/login" className='link'>Sign in</Link>
                <Link className="link" to="/register">
                  <button>Join</button>
                </Link>
              </>
            )}
          </div>
        </div>
        {(active || pathname !== "/") && (
          <>
            <hr />
            <div className="menu">
              <Link className="link menuLink" to="/">
                Graphics & Design
              </Link>
              <Link className="link menuLink" to="/">
                Video & Animation
              </Link>
              <Link className="link menuLink" to="/">
                Writing & Translation
              </Link>
              <Link className="link menuLink" to="/">
                AI Services
              </Link>
              <Link className="link menuLink" to="/">
                Digital Marketing
              </Link>
              <Link className="link menuLink" to="/">
                Music & Audio
              </Link>
              <Link className="link menuLink" to="/">
                Programming & Tech
              </Link>
              <Link className="link menuLink" to="/">
                Business
              </Link>
              <Link className="link menuLink" to="/">
                Lifestyle
              </Link>
            </div>
            <hr />
          </>
        )}
      </div>
    );
}

export default Navbar

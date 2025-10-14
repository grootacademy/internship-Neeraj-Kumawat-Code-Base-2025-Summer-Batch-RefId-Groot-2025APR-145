import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Page_Notfound() {
    let Navigate = useNavigate()
    return (
        <div>
            <Link onClick={()=>{
                Navigate(-1)
            }} className="flex items-center justify-center min-h-screen" style={{backgroundImage: 'url(https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </Link>
        </div>
    )
}

export default Page_Notfound

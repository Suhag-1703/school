import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <section>
            <p>We can't find that page.</p>
            <p>Are are you sure you got the link right?</p>
            <span className="go-backbtn" onClick={() => navigate(-1)}>Go Back</span>
        </section>
    )
}

export default NotFound

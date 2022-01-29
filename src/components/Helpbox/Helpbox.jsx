import './Helpbox.css'
import React from 'react'
function Helpbox() {
    return (
        <div className="helpbox">
            <div className="title">Need help?</div>
            <div className="hint-text">
                We are always happy to help you and offer the best discount.
            </div>

            <div className="contact-box">
                <button
                    className="contact-type"
                    onClick={()=>{window.location.href='mailto:portal@uds.systems'}}
                    // useRef="noopener noreferrer"
                >
                    <img
                        style={{margin: "0 15px 0 0"}}
                        src="https://myudssystemsstorageprod.blob.core.windows.net/uds-portal-assets/b2c-auth-page/mail.svg"
                        alt="icon"
                    />
                    portal@uds.systems
                </button>

                <button
                    className="contact-type"
                    onClick={()=>{window.location.href='skype:live:uds_ddt?chat'}}
                >
                    <img
                        style={{margin: "0 15px 0 0"}}
                        src="https://myudssystemsstorageprod.blob.core.windows.net/uds-portal-assets/b2c-auth-page/Shape.svg"
                        alt="icon"
                    />
                    uds.systems
                </button>
            </div>
        </div>
    )
}

export default Helpbox

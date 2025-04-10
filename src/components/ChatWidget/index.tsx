// importing external style
import { styles } from "../styles";
// import icon
import { BsFillTelephoneFill } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
//import ModalWindow
import ModalWindow from "./ModalWindow";
import {agent} from './constant'
import widgetConfig from "../../constants/config";

import 'bootstrap/dist/css/bootstrap.min.css';
function ChatWidget() {
    // state variable to track if widget button was hovered on
    const [hovered, setHovered] = useState(false);
    // state variable to track modal visibility
    // const [visible, setVisible] = useState(false);
    const [visible, setVisible] = useState<boolean>(false);
    //creating a ref 'id'
    const widgetRef = useRef(null);
    const [micStatus, setMicStatus] = useState<"active" | "inactive" | "denied" | "checking">("checking");
    // use effect listener to check if the mouse was cliked outside the window 
    useEffect(() => {
        function handleClickOutside(event) {
            if (widgetRef.current && !widgetRef.current.contains(event.target)) {
                // setVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [widgetRef]);
    // Callback function to update the parent's state

    // useEffect(() => {
    //     const checkMic = async () => {
    //       try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    //         // Microphone is active
    //         setMicStatus("active");
    //         setVisible(true);

    //         // Stop the tracks immediately if you're not using the stream
    //         stream.getTracks().forEach((track) => track.stop());
    //       } catch (error) {
    //         // Microphone is inactive or access denied
    //         if (error.name === "NotAllowedError" || error.message === "name") {
    //           setMicStatus("denied");
    //           setVisible(false);
    //         } else {
    //           setMicStatus("inactive");
    //           setVisible(false);
    //         }
    //       }
    //     };

    //     checkMic();
    //   }, []);

    async function checkMic() {

        // try {
        //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        //     // Microphone is active
        //     setMicStatus("active");
        //     setVisible(!false);

        //     // Stop the tracks immediately if you're not using the stream
        //     stream.getTracks().forEach((track) => track.stop());
        //   } catch (error) {
        //     // Microphone is inactive or access denied
        //     if (error.name === "NotAllowedError" || error.message === "name") {
        //       setMicStatus("denied");
        //       setVisible(false);
        //     } else {
        //       setMicStatus("inactive");
        //       setVisible(false);
        //     }
        //   }

        if (navigator.mediaDevices && !visible) {
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream) => {
                    setMicStatus("active");
                    setVisible(!false);
                }).catch((error: any) => {

                    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                        setMicStatus("denied");
                    } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
                        setMicStatus("denied");
                    } else {
                        setMicStatus("denied");
                    }
                });
        } else if (visible) {
            setVisible(false);
        }


    }


    const getChatText = () => {
        if (micStatus === "denied") {
            return {
                title: `Unable to call `,
                subtitle: `${widgetConfig.agentName} For Help`,
            };
        }
        if (!visible) {
            return {
                title: `Speak With`,
                subtitle: `${widgetConfig.agentName} For Help`,
            };
        }
        return {
            title: `End Call With`,
            subtitle: `${widgetConfig.agentName} For Help`,
        };
    };

    const { title, subtitle } = getChatText();

    return (
        //container
        //call widgetRef inside the div
        <div ref={widgetRef}>

            {/* Call Modal Window */}
            <ModalWindow visible={visible} setVisible={setVisible} />

            {/* Chat Button Component */}


            <div className="chat-widget d-flex align-items-center  px-3 py-1 "
                onClick={() => checkMic()}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ cursor: "pointer", maxWidth: "100%", width: "15rem", }}>
                {/* Logo */}
                <div className="chat-logo me-3" >
                    <img src="https://scaleagilesolutions.com/wp-content/uploads/dist/logo.png" alt="Logo" className="chat-logo-img" />
                </div>

             
            <div className="chat-text">
                    <p className="chat-text-header text-white"  style={{ fontSize: '0.93rem' }}>
                        {title} 
                    </p>
                    {subtitle && <p className="m-0 chat-subtitle chat-text-header text-white" style={{ fontSize: '0.93rem' }}>{subtitle}</p>}
                    {/* <p className=".chat-powered" style={{ fontSize: '0.5rem' }}>
                        Powered by <span className="fd">ConnexUS Ai</span>
                    </p> */}
                    <p className=" text-light opacity-70 text-end text-font-change" style={{ fontSize: '0.4rem' }}>Powered by ConnexUS AI</p>
                </div>
            </div>

          

            

        </div>
    );
}


export default ChatWidget;




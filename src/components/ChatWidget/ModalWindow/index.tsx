// importing external style
// import React, { useState } from 'react';
// import React, { useState, useRef } from 'react';
import { styles } from "../../styles";
import React, { useEffect, useState, useRef } from 'react';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { RetellWebClient } from "retell-client-js-sdk";
import "../../../../src/app.css";
import {agent} from '../constant'
import widgetConfig from "../../../constants/config";

const agentId = "agent_b1a90afc73130fd4ff0fbda22a";
// agent_1daeee3e12bcdfc1c6bc813ba9
// agent_4e6574d0c75b8003dd81f13212
interface RegisterCallResponse {
    access_token: string;
}
interface ModalWindowProps {
    visible: boolean;
    setVisible: (val: boolean) => void;
  }

const retellWebClient = new RetellWebClient();
function ModalWindow(props ) {
    const [micStream, setMicStream] = useState<MediaStream | null>(null);
    const [audioMotion, setAudioMotion] = useState<AudioMotionAnalyzer | null>(null);
    const [isCalling, setIsCalling] = useState(false);
    const [startingCall, setstartingCall] = useState(false);
    const [showPopup, setsshowPopup] = useState(false);
    const [chatData, setChatData] = useState<{ role: string; content: string }[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [micAccess, setMicAccess] = useState<null | string>(null);
    // Initialize the SDK
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const [bufferLength, setBufferLength] = useState<number>(0);
    const [dataArray, setDataArray] = useState<Float32Array | null>(null);
    
    
  
    useEffect(() => {
        try {
            const handleUpdate = (update: any) => {
                if (update.transcript && update.transcript.length > 0) {
                    const lastMessage = update.transcript[update.transcript.length - 1];
                    const newContent = lastMessage.content || ""; // Ensure content exists
                    const role = lastMessage.role;
                        // console.log(lastMessage)
                    setChatData((prev) => {
                        const lastBubble = prev[prev.length - 1];

                        // If the last bubble is from the same speaker, replace its content
                        if (lastBubble && lastBubble.role === role) {
                            return [
                                ...prev.slice(0, -1), // Remove the last bubble
                                { ...lastBubble, content: newContent }, // Replace with updated content
                            ];
                        }

                        // If speaker changes, add a new bubble
                        return [
                            ...prev,
                            { role, content: newContent },
                        ];
                    });
                }
            };

            retellWebClient.on("call_started", () => {
                console.log("call started By Web Call");
            });

            retellWebClient.on("call_ended", () => {
                try{
                    console.log("call_ended")
                    setIsCalling(false);
                    props.setVisible(false);
                }catch(e){
                    console.log("call_ended")
                    props.setVisible(false);
                }
              
              
            });

            // When agent starts talking for the utterance
            // useful for animation
            retellWebClient.on("agent_start_talking", (op) => {
                console.log("agent_start_talking");
            });

            // When agent is done talking for the utterance
            // useful for animation
            retellWebClient.on("agent_stop_talking", () => {
                console.log("agent_stop_talking");
            });

            // Real time pcm audio bytes being played back, in format of Float32Array
            // only available when emitRawAudioSamples is true
            retellWebClient.on("audio", (audio) => {
                // console.log("audio", audio)
            //byteLength
                // setDataArray(new Float32Array(audio)); 
                // draw();
                // handleCallAudio(audio);
            });

            // Update message such as transcript
            // You can get transcrit with update.transcript
            // Please note that transcript only contains last 5 sentences to avoid the payload being too large
            // retellWebClient.on("update", (update) => {
            //     console.log(update,'updates');
            //     console.log(update.transcript);
            // });
            retellWebClient.on("update", handleUpdate);

            // update.transcript

            retellWebClient.on("metadata", (metadata) => {
                // console.log(metadata);
            });

            retellWebClient.on("error", (error) => {
                console.log("An error occurred:", error);
                // Stop the call
                retellWebClient.stopCall();
            });
            return () => {
                // Cleanup listeners
                retellWebClient.off("update", handleUpdate);
            };
        } catch (e) {
            console.log(e)
        }
    }, []);
   
    const handleMicToggle = async (vis = false) => {
        try {
           
            // try {
            //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            //     alert('123')
            //     setMicAccess("Microphone access granted.");
            //     // stream.getTracks().forEach(track => track.stop()); // Stop mic access after check
            //   } catch (error: any) {
            //     if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
            //       setMicAccess("Microphone access denied. Please allow access in browser settings.");
            //     } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
            //       setMicAccess("No microphone found. Please connect a microphone.");
            //     } else {
            //       setMicAccess("An error occurred while accessing the microphone.");
            //     }
            //   }

            if (vis) {
                if (navigator.mediaDevices) {
                    navigator.mediaDevices
                        .getUserMedia({ audio: true, video: false })
                        .then((stream) => {
                            setMicAccess("Microphone access granted.");
                            // Create MediaStreamSource from microphone input
                            const micSource = audioMotion.audioCtx.createMediaStreamSource(stream);
                            // Connect microphone stream to AudioMotionAnalyzer
                            audioMotion.connectInput(micSource);
                            // Mute output to prevent feedback loop
                            audioMotion.volume = 0;
                            // Save the stream
                            setMicStream(stream);
                        }).catch((error:any) => {
                            
                            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                                setMicAccess("Microphone access denied. Please allow access in browser settings.");
                              } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
                                setMicAccess("No microphone found. Please connect a microphone.");
                              } else {
                                setMicAccess("An error occurred while accessing the microphone.");
                              }
                        });
                } else {
                    alert('User mediaDevices not available');
                }
            } else {
                // Disconnect the microphone stream
                if (micStream) {
                    audioMotion.disconnectInput(micStream, true);
                    setMicStream(null);
                }
            }
        } catch (console) {
            console.log("Error in handleMicToggle:", console);
        }
    };


    const toggleConversation = async (val) => {
        try {
            if (isCalling && val == false) {
                retellWebClient.stopCall();
                // props.visible = false
            } else if (val) {
                
            //    alert('starting call')

                // if(micAccess == "Microphone access granted."){
                console.log(widgetConfig.agentId)
                    const registerCallResponse = await registerCall(widgetConfig.agentId);
                    if (registerCallResponse.access_token) {
                        retellWebClient.startCall({
                            accessToken: registerCallResponse.access_token,
                            emitRawAudioSamples: true,
                            sampleRate: 24000,
                        }).catch((e) => console.log(e,'message'));
                        setIsCalling(true); // Update button to "Stop" when conversation starts
                        setstartingCall(false)
                    }
                // }else{
                //     // document.getElementById('chat_widget').textContent = micAccess
                //    console.log(micAccess)
                // }
            }
        } catch (e) {
            console.log(e,'message two');
        }

    };

    async function registerCall(agentId: string): Promise<RegisterCallResponse> {
        try {
            setstartingCall(true)
            // Update the URL to match the new backend endpoint you created
            const response = await fetch("https://api.retellai.com/v2/create-web-call", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer 1b07e2d1-c19f-44de-a638-303e755e1477', // Replace with your actual Bearer token
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    agent_id: agentId, // Pass the agentId as agent_id
                    // You can optionally add metadata and retell_llm_dynamic_variables here if needed
                    metadata: {sourceId: widgetConfig.sourceId},
                    retell_llm_dynamic_variables: { sourceId: widgetConfig.sourceId }
                }),
            });

            if (!response.ok) {
                console.log(`Error: ${response.status}`);
            }

            const data: RegisterCallResponse = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    // Scroll to the bottom whenever chatData updates

    useEffect(() => {
        if (props.visible) {
            
            // initAudio()
            // alert(props.visible)
            toggleConversation(props.visible)
            // handleMicToggle(props.visible);
             // Turn on the microphone when the modal becomes visible
        } else {
            setChatData([]);
            toggleConversation(false)
            // handleMicToggle(false);

        }
    }, [props.visible]);

    useEffect(() => {
        if (chatContainerRef.current && props.visible) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth", // Use smooth scrolling
            });
        }
    }, [chatData]);

    useEffect(() => {
        if (audioContext && analyser && canvasRef.current) {
            draw();
        }
    }, [audioContext, analyser, bufferLength, dataArray]);

    const initAudio = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const analyserNode = audioCtx.createAnalyser();
                const source = audioCtx.createMediaStreamSource(stream);
                source.connect(analyserNode);
                analyserNode.fftSize = 512;
                const bufferLen = analyserNode.frequencyBinCount;
                const dataArr = new Float32Array(bufferLen);
                setAudioContext(audioCtx);
                setAnalyser(analyserNode);
                setBufferLength(bufferLen);
                setDataArray(dataArr);
            })
            .catch(err => {
                console.error('Error accessing microphone:', err);
            });
    };

    const draw = () => {
        if (dataArray) {
          
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                analyser.getFloatTimeDomainData(dataArray);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const baseRadius = canvas.width * 0.375; // Make the base radius 37.5% of the canvas width

                let distortionFactor = 0;
                for (let i = 0; i < bufferLength; i++) {
                    distortionFactor += Math.abs(dataArray[i]);
                }
                distortionFactor /= bufferLength;

                let dynamicFactor = distortionFactor * 200;

                ctx.lineWidth = 2;
                ctx.strokeStyle = '#00e0ff';
                ctx.beginPath();

                for (let i = 0; i < bufferLength; i++) {
                    const angle = (i / bufferLength) * Math.PI * 2;
                    const distance = Math.sin((angle + performance.now() * 0.003) * 0.5) * dynamicFactor;
                    const dynamicRadius = baseRadius + Math.sin(angle * 3) * dynamicFactor;
                    const x = centerX + Math.cos(angle) * dynamicRadius + distance;
                    const y = centerY + Math.sin(angle) * dynamicRadius + distance;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.closePath();
                ctx.stroke();
                requestAnimationFrame(draw);
            }
        }
    };

    return (        
                <div
                    style={{
                        ...styles.modalWindow,
                        display: props.visible ? "none" : "none", // Hide the modal when not visible
                        opacity: props.visible ? "1" : "0",       // Smooth opacity transition
                        transition: "opacity 0.3s ease",     
                        ...{ opacity: props.visible ? "1" : "0" },

                    }}
                >
                    <div
                    className="chat-container"
                    ref={chatContainerRef}
                    style={{
                        height: "56vh", // Adjust height based on the viewport
                        width: "100%",
                        overflowY: "auto",
                        background: "#333",
                        padding: "1rem",
                        borderRadius: "10px",
                        display: startingCall && !isCalling ? "flex" : "block", // Center loading icon
                        justifyContent: "center", // Center loading icon horizontally
                        alignItems: "center", // Center loading icon vertically
                      }}
                >

                    {startingCall && !isCalling ? (
                    <div className="loading-icon">
                        <div className="spinner"></div> {/* Add your spinner styles */}
                        <p style={{ color: "#fff", marginTop: "1rem" }}>Connecting...</p>
                    </div>
                ) : (
                    // Render chat bubbles when the call is connected
                    chatData.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-bubble ${message.role === "agent" ? "agent" : "user"}`}
                        >
                            {message.content}
                        </div>
                    ))
                )}
                </div>  
        </div>
    );
}
export default ModalWindow;
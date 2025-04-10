import React, { useEffect, useRef, useState } from 'react';

const AudioVisualizer = ({ initialCircleSize = 150, audioStream = null }) => {
    const canvasRef = useRef(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);
    const [bufferLength, setBufferLength] = useState(null);
    const [circleSize, setCircleSize] = useState(initialCircleSize);
    const [isVisualizing, setIsVisualizing] = useState(false);

    const startVisualizer = () => {
        setIsVisualizing(true);
    };

    useEffect(() => {
        if (!isVisualizing) return;

        const initAudio = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Check for standard AudioContext, fallback to webkitAudioContext for legacy support
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const context = new AudioContext();
            setAudioContext(context);

            const analyserNode = context.createAnalyser();
            setAnalyser(analyserNode);

            // const stream = audioStream || navigator.mediaDevices.getUserMedia({ audio: true });
            // stream.then((inputStream) => {
            //     const source = context.createMediaStreamSource(inputStream);
            //     source.connect(analyserNode);

            //     analyserNode.fftSize = 512;
            //     const length = analyserNode.frequencyBinCount;
            //     setBufferLength(length);
            //     setDataArray(new Float32Array(length));

            //     drawWave(ctx, context, analyserNode);
            // }).catch(err => {
            //     console.error('Error accessing audio stream:', err);
            // });
        };

        initAudio();

        return () => {
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [audioStream, isVisualizing]);

    const drawWave = (ctx, context, analyserNode) => {
        analyserNode.getFloatTimeDomainData(dataArray);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        const baseRadius = circleSize;

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

        requestAnimationFrame(() => drawWave(ctx, context, analyserNode));
    };

    return (
        <div style={{ textAlign: 'center', color: '#00e0ff' }}>
            <button onClick={startVisualizer} style={{ padding: '10px', fontSize: '16px', backgroundColor: '#00e0ff', color: 'white', borderRadius: '5px', marginBottom: '20px' }}>
                Start Visualizer
            </button>

            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                style={{
                    border: '2px solid #00e0ff',
                    borderRadius: '50%',
                    display: isVisualizing ? 'block' : 'none'
                }}
            />
        </div>
    );
};

export default AudioVisualizer;

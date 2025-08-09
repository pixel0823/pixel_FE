import { useRef } from "react";

const Main: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return <canvas ref={canvasRef} />;

};

export default Main;

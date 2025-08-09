import React, { useRef, useEffect } from "react";

// 헬퍼: 텍스트 픽셀 샘플링
function getTextCoords(
    ctx: CanvasRenderingContext2D,
    text: string,
    width: number,
    height: number,
    sampleGap: number
): { x: number; y: number }[] {
    ctx.clearRect(0, 0, width, height);
    ctx.font = "bold 350px sans-serif"; // 글자 크기 키움
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#8888ff";
    ctx.fillText(text, width / 2, height / 2);

    const coords = [];
    const data = ctx.getImageData(0, 0, width, height).data;
    for (let y = 0; y < height; y += sampleGap) {
        for (let x = 0; x < width; x += sampleGap) {
            const idx = (y * width + x) * 4 + 3; // alpha
            if (data[idx] > 128) coords.push({ x, y });
        }
    }
    return coords;
}

const LaserText: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const width = canvas.width;
        const height = canvas.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const points = getTextCoords(ctx, "PIXEL", width, height / 2, 8);

        // 아래 원 (원점)
        const origin = { x: width / 2, y: height - 100 }; // 기존보다 100px 더 위로 올림

        let running = true;
        function draw(t: number) {
            if (!ctx) return;

            ctx.clearRect(0, 0, width, height);

            // 원
            ctx.beginPath();
            ctx.arc(origin.x, origin.y, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "#7474ff";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#7474ff";
            ctx.fill();
            ctx.shadowBlur = 0;

            // 레이저
            ctx.strokeStyle = "rgba(140,140,255,0.2)";
            points.forEach((pt) => {
                ctx.beginPath();
                ctx.moveTo(origin.x, origin.y);
                ctx.lineTo(pt.x, pt.y);
                ctx.stroke();
            });

            // 깜박이는 점 + 입체 효과
            points.forEach((pt, i) => {
                const phase = t * 0.003 + i;
                const alpha = 0.3 + 0.7 * Math.abs(Math.sin(phase));
                const brightness = 180 + Math.floor(60 * (pt.y / (height / 2)));
                ctx.save();
                ctx.beginPath();
                ctx.rect(pt.x - 2.5, pt.y - 2.5, 5.5, 5.5);
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#2222aa";
                ctx.fillStyle = `rgba(${brightness},${brightness + 10},255,${alpha})`;
                ctx.fill();
                ctx.restore();
            });

            if (running) requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);

        return () => {
            running = false;
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            style={{
                background: "#150101ff",
                display: "block",
                margin: "0 auto"
            }}
        />
    );
};

export default LaserText;

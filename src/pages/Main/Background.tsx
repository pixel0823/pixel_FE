import React, { useRef, useEffect } from "react";
import LaserText from "./LaserText";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    move: (width: number, height: number, mousePos: { x: number; y: number } | null, mouseDelta?: { x: number; y: number }) => void;
}

class ParticleImpl implements Particle {
    public x: number;
    public y: number;
    public vx: number;
    public vy: number;
    public radius: number;

    constructor(x: number, y: number, vx: number, vy: number, radius: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    move(
        width: number,
        height: number,
        mousePos: { x: number; y: number } | null,
        mouseDelta?: { x: number; y: number }
    ) {
        // 마우스 위치에 따른 힘 제거

        // 마우스 이동 방향으로 전체적으로 힘을 추가
        if (mouseDelta) {
            this.vx += mouseDelta.x * 0.003;
            this.vy += mouseDelta.y * 0.005;
        }

        // 랜덤 이동
        this.vx += (Math.random() - 0.5) * 0.08;
        this.vy += (Math.random() - 0.5) * 0.08;

        this.x += this.vx;
        this.y += this.vy;

        // 경계면에서 반사
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // 속도 감속 (마찰)
        this.vx *= 0.98;
        this.vy *= 0.98;
    }
}

function distance(
    p1: Particle | { x: number; y: number },
    p2: Particle | { x: number; y: number }
): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function draw(ctx: CanvasRenderingContext2D, particles: Particle[], mousePos: { x: number; y: number } | null) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    // 배경색 적용
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ff0000"; // 점 색상 새빨간색

    // 입자 그리기
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); // 점 크기 2
        ctx.fill();
    });

    // 입자들 간 선 연결
    const maxDistance = 120;
    ctx.lineWidth = 1; // 선 두께 1
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dist = distance(particles[i], particles[j]);
            if (dist < maxDistance) {
                ctx.strokeStyle = `rgba(255,50,50,${1 - dist / maxDistance})`; // 붉은 계열
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        // 마우스와 점 사이 선 연결
        if (mousePos) {
            const dist = distance(particles[i], mousePos);
            if (dist < maxDistance) {
                ctx.strokeStyle = `rgba(255,50,50,${1 - dist / maxDistance})`; // 붉은 계열
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.stroke();
            }
        }
    }
}

const Background: React.FC<{ numParticles?: number }> = ({
    numParticles = 100,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosition = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        //캔버스 크기 설정
        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();

        window.addEventListener("resize", resize);

        let lastMousePos: { x: number; y: number } | null = null;
        let mouseDelta = { x: 0, y: 0 };

        //마우스 위치 업데이트
        function handleMouseMove(e: MouseEvent) {
            if (lastMousePos) {
                mouseDelta.x = e.clientX - lastMousePos.x;
                mouseDelta.y = e.clientY - lastMousePos.y;
            }
            lastMousePos = { x: e.clientX, y: e.clientY };
            mousePosition.current = { x: e.clientX, y: e.clientY };
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", () => {
            mousePosition.current = null;
            lastMousePos = null;
            mouseDelta = { x: 0, y: 0 };
        });

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        //입자 초기화
        const particles: Particle[] = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(
                new ParticleImpl(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    (Math.random() - 0.5) * 0.7,
                    (Math.random() - 0.5) * 0.7,
                    2 // 점 크기 2로 고정
                )
            );
        }
        let animationId: number;

        function animate() {
            if (!canvas) return;
            if (!ctx) return;
            particles.forEach((p) => p.move(canvas.width, canvas.height, mousePosition.current, mouseDelta));
            draw(ctx, particles, mousePosition.current);
            // 마우스 이동 효과 점차 감소
            mouseDelta.x *= 0.8;
            mouseDelta.y *= 0.8;
            animationId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", () => { mousePosition.current = null; });
            cancelAnimationFrame(animationId);
        };
    }, [numParticles]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{
                    display: "block",
                    width: "100vw",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: -1
                }}
            />
            <LaserText />
        </div>
    );
};

export default Background;
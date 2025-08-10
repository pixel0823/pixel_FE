import React, { useRef, useEffect } from "react";
import LaserText from "./LaserText";


interface ParticleOptions {
    minSpeedX: number;
    maxSpeedX: number;
    minSpeedY: number;
    maxSpeedY: number;
    directionX: "center" | "left" | "right";
    directionY: "center" | "up" | "down";
    density: number;
    dotColor: string;
    lineColor: string;
    particleRadius: number;
    lineWidth: number;
    curvedLines: boolean;
    proximity: number;
    parallax: boolean;
    parallaxMultiplier: number;
    onInit?: () => void;
    onDestroy?: () => void;
}


const defaultOptions: ParticleOptions = {
    minSpeedX: 0.1,
    maxSpeedX: 0.7,
    minSpeedY: 0.1,
    maxSpeedY: 0.7,
    directionX: "center",
    directionY: "center",
    density: 10000,
    dotColor: "#FF1A1A",      // 점 색상 (예: 빨간색)
    lineColor: "#8B0000",     // 선 색상 (예: 붉은색)
    particleRadius: 4,
    lineWidth: 1,
    curvedLines: false,
    proximity: 100,
    parallax: true,
    parallaxMultiplier: 5,
    onInit: undefined,
    onDestroy: undefined,
};


interface Position {
    x: number;
    y: number;
}


interface Speed {
    x: number;
    y: number;
}


class Particle {
    position: Position;
    speed: Speed;
    layer: number;
    stackPos: number = 0;
    parallaxOffsetX: number = 0;
    parallaxOffsetY: number = 0;
    parallaxTargX: number = 0;
    parallaxTargY: number = 0;


    constructor(canvas: HTMLCanvasElement, options: ParticleOptions) {
        this.position = {
            x: Math.ceil(Math.random() * canvas.width),
            y: Math.ceil(Math.random() * canvas.height),
        };
        this.layer = Math.ceil(Math.random() * 3);


        // DirectionX
        switch (options.directionX) {
            case "left":
                this.speed = {
                    x: -options.maxSpeedX + (Math.random() * options.maxSpeedX) - options.minSpeedX,
                    y: 0,
                };
                break;
            case "right":
                this.speed = {
                    x: (Math.random() * options.maxSpeedX) + options.minSpeedX,
                    y: 0,
                };
                break;
            default: // center
                this.speed = {
                    x: (-options.maxSpeedX / 2) + (Math.random() * options.maxSpeedX),
                    y: 0,
                };
                this.speed.x += this.speed.x > 0 ? options.minSpeedX : -options.minSpeedX;
                break;
        }


        // DirectionY
        switch (options.directionY) {
            case "up":
                this.speed.y = -options.maxSpeedY + (Math.random() * options.maxSpeedY) - options.minSpeedY;
                break;
            case "down":
                this.speed.y = (Math.random() * options.maxSpeedY) + options.minSpeedY;
                break;
            default:
                this.speed.y = (-options.maxSpeedY / 2) + (Math.random() * options.maxSpeedY);
                this.speed.y += this.speed.y > 0 ? options.minSpeedY : -options.minSpeedY;
                break;
        }
    }


    setStackPos(i: number) {
        this.stackPos = i;
    }


    // 업데이트
    updatePosition(
        options: ParticleOptions,
        canvas: HTMLCanvasElement,
        mouseX: number,
        mouseY: number,
        winW: number,
        winH: number,
        orientationSupport: boolean,
        desktop: boolean,
        tiltX: number,
        tiltY: number
    ) {
        let pointerX: number, pointerY: number;
        if (options.parallax) {
            if (orientationSupport && !desktop) {
                // 모바일 기울기
                const ratioX = (winW - 0) / (30 - -30);
                pointerX = (tiltX - -30) * ratioX + 0;
                const ratioY = (winH - 0) / (30 - -30);
                pointerY = (tiltY - -30) * ratioY + 0;
            } else {
                pointerX = mouseX;
                pointerY = mouseY;
            }
            // Parallax offset
            this.parallaxTargX = (pointerX - (winW / 2)) / (options.parallaxMultiplier * this.layer);
            this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10;
            this.parallaxTargY = (pointerY - (winH / 2)) / (options.parallaxMultiplier * this.layer);
            this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10;
        }
        const elWidth = canvas.width;
        const elHeight = canvas.height;


        // x축
        switch (options.directionX) {
            case "left":
                if (this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
                    this.position.x = elWidth - this.parallaxOffsetX;
                }
                break;
            case "right":
                if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth) {
                    this.position.x = 0 - this.parallaxOffsetX;
                }
                break;
            default:
                if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth || this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
                    this.speed.x = -this.speed.x;
                }
                break;
        }
        // y축
        switch (options.directionY) {
            case "up":
                if (this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
                    this.position.y = elHeight - this.parallaxOffsetY;
                }
                break;
            case "down":
                if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight) {
                    this.position.y = 0 - this.parallaxOffsetY;
                }
                break;
            default:
                if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight || this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
                    this.speed.y = -this.speed.y;
                }
                break;
        }
        // 이동
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }


    draw(
        ctx: CanvasRenderingContext2D,
        options: ParticleOptions,
        particles: Particle[]
    ) {
        ctx.fillStyle = options.dotColor; // 점 색상 적용
        ctx.beginPath();
        ctx.arc(
            this.position.x + this.parallaxOffsetX,
            this.position.y + this.parallaxOffsetY,
            options.particleRadius / 2,
            0,
            Math.PI * 2,
            true
        );
        ctx.closePath();
        ctx.fill();


        ctx.beginPath();
        // Stack 기준 위쪽 입자들과 거리비교해서 선 연결
        for (let i = particles.length - 1; i > this.stackPos; i--) {
            const p2 = particles[i];
            const a = this.position.x - p2.position.x;
            const b = this.position.y - p2.position.y;
            const dist = Math.sqrt(a * a + b * b);
            if (dist < options.proximity) {
                ctx.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY);
                if (options.curvedLines) {
                    ctx.quadraticCurveTo(
                        Math.max(p2.position.x, p2.position.x),
                        Math.min(p2.position.y, p2.position.y),
                        p2.position.x + p2.parallaxOffsetX,
                        p2.position.y + p2.parallaxOffsetY
                    );
                } else {
                    ctx.lineTo(p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY);
                }
            }
        }
        ctx.stroke();
        ctx.closePath();
    }
}


// React 컴포넌트
const Background: React.FC<{ options?: Partial<ParticleOptions> }> = ({ options }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const opts: ParticleOptions = { ...defaultOptions, ...(options || {}) };
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;


        function styleCanvas() {
            if (!canvas) return;
            if (!ctx) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.fillStyle = opts.dotColor;
            ctx.strokeStyle = opts.lineColor;
            ctx.lineWidth = opts.lineWidth;
        }
        styleCanvas();


        // 파티클 생성
        let particles: Particle[] = [];
        const numParticles = Math.round((canvas.width * canvas.height) / opts.density);
        for (let i = 0; i < numParticles; i++) {
            const p = new Particle(canvas, opts);
            p.setStackPos(i);
            particles.push(p);
        }


        // 상태 저장용
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;
        let winW = window.innerWidth;
        let winH = window.innerHeight;
        let animationId: number;
        const desktop = !/iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7/i.test(navigator.userAgent);
        const orientationSupport = "DeviceOrientationEvent" in window;
        let tiltX = 0, tiltY = 0;


        function resizeHandler() {
            if (!canvas) return;

            const oldWidth = canvas.width;
            const oldHeight = canvas.height;

            styleCanvas();
            winW = window.innerWidth;
            winH = window.innerHeight;

            const newNumParticles = Math.round((canvas.width * canvas.height) / opts.density);
            const diff = newNumParticles - particles.length;

            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    const p = new Particle(canvas, opts);

                    let posX: number;
                    let posY: number;

                    if (canvas.width > oldWidth && canvas.height > oldHeight) {
                        // 가로, 세로 모두 늘어난 경우 → 세 구역 중 하나를 랜덤 선택
                        const zone = Math.floor(Math.random() * 3);
                        if (zone === 0) {
                            // 오른쪽 새 영역
                            posX = Math.random() * (canvas.width - oldWidth) + oldWidth;
                            posY = Math.random() * oldHeight;
                        } else if (zone === 1) {
                            // 아래쪽 새 영역
                            posX = Math.random() * oldWidth;
                            posY = Math.random() * (canvas.height - oldHeight) + oldHeight;
                        } else {
                            // 오른쪽 아래 코너
                            posX = Math.random() * (canvas.width - oldWidth) + oldWidth;
                            posY = Math.random() * (canvas.height - oldHeight) + oldHeight;
                        }
                    } else if (canvas.width > oldWidth) {
                        // 가로만 늘어난 경우
                        posX = Math.random() * (canvas.width - oldWidth) + oldWidth;
                        posY = Math.random() * canvas.height;
                    } else if (canvas.height > oldHeight) {
                        // 세로만 늘어난 경우
                        posX = Math.random() * canvas.width;
                        posY = Math.random() * (canvas.height - oldHeight) + oldHeight;
                    } else {
                        // 줄어든 경우에는 그냥 랜덤
                        posX = Math.random() * canvas.width;
                        posY = Math.random() * canvas.height;
                    }

                    p.position.x = posX;
                    p.position.y = posY;

                    p.setStackPos(particles.length + i);
                    particles.push(p);
                }
            } else if (diff < 0) {
                particles.splice(diff); // 줄어든 경우
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].setStackPos(i);
            }
        }



        window.addEventListener("resize", resizeHandler);


        // 마우스 이벤트
        function handleMouseMove(e: MouseEvent) {
            mouseX = e.pageX;
            mouseY = e.pageY;
        }
        document.addEventListener("mousemove", handleMouseMove);


        if (orientationSupport && !desktop) {
            window.addEventListener("deviceorientation", function (event: DeviceOrientationEvent) {
                if (event.beta != null && event.gamma != null) {
                    tiltY = Math.min(Math.max(-event.beta, -30), 30);
                    tiltX = Math.min(Math.max(-event.gamma, -30), 30);
                }
            }, true);
        }


        // 메인 렌더 함수
        function draw() {
            if (!canvas) return;
            if (!ctx) return;
            ctx.fillStyle = "#121212"; // 바탕색 (예: 어두운 회색)
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].updatePosition(
                    opts, canvas, mouseX, mouseY, winW, winH, orientationSupport, desktop, tiltX, tiltY
                );
            }
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw(ctx, opts, particles);
            }
            animationId = requestAnimationFrame(draw);
        }
        draw();
        if (opts.onInit) opts.onInit();


        return () => {
            window.removeEventListener("resize", resizeHandler);
            document.removeEventListener("mousemove", handleMouseMove);
            if (opts.onDestroy) opts.onDestroy();
            cancelAnimationFrame(animationId);
        };
    }, [options]);


    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "block",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: -1
                }}
            />
            <LaserText />
        </div>
    );
};


export default Background;
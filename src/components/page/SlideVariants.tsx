import { Variants } from "framer-motion";

export interface SlideCustomProps {
    enter: "left" | "right";
    exitDir: "left" | "right";
}

export const slideVariants: Variants = {
    initial: ({ enter }: SlideCustomProps) => ({
        x: enter === "left" ? -100 : 100, // 오른쪽 진입이면 오른쪽에서 들어옴
        opacity: 0,
        position: "absolute",
        width: "100%"
    }),
    animate: {
        x: 0,
        opacity: 1,
        position: "relative",
        transition: { duration: 0.5 }
    },
    exit: ({ exitDir }: SlideCustomProps) => ({
        x: exitDir === "left" ? 100 : -100, // 오른쪽 퇴장이면 왼쪽으로 나감
        opacity: 0,
        position: "absolute",
        width: "100%",
        transition: { duration: 0.5 }
    })
};

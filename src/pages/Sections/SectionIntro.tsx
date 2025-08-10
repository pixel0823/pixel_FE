import { SlideCustomProps, slideVariants } from "@/components/page/SlideVariants";
import { motion } from "framer-motion";

interface SectionIntroProps extends SlideCustomProps { }

const SectionIntro: React.FC<SectionIntroProps> = ({ enter, exitDir }) => (
    <motion.div
        custom={{ enter, exitDir }}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%", padding: "62px 30px" }}
    >
        <h2 style={{ color: "#FF1A1A" }}>게임 소개 및 설명</h2>
        <p style={{ color: "#fff" }}>게임의 세계에 오신 걸 환영합니다!</p>
    </motion.div>
);

export default SectionIntro;

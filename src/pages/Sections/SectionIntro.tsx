import { motion } from "framer-motion";

const SectionIntro: React.FC = () => (
    <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", padding: "62px 30px" }}
    >
        <h2 style={{ color: "#FF1A1A" }}>게임 소개 및 설명</h2>
        <p style={{ color: "#fff" }}>게임의 세계에 오신 걸 환영합니다!</p>
    </motion.div>
);

export default SectionIntro;

import { motion } from "framer-motion";

const SectionCommunity: React.FC = () => (
    <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", padding: "62px 30px" }}
    >
        <h2 style={{ color: "#FF1A1A" }}>커뮤니티</h2>
        <p style={{ color: "#fff" }}>유저 소통 게시판 및 팁 공유.</p>
    </motion.div>
);

export default SectionCommunity;

import { SlideCustomProps, slideVariants } from "@/components/page/SlideVariants";
import { motion } from "framer-motion";

interface SectionNoticeProps extends SlideCustomProps { }

const SectionNotice: React.FC<SectionNoticeProps> = ({ enter, exitDir }) => (
    <motion.div
        custom={{ enter, exitDir }}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%", padding: "62px 30px" }}
    >
        <h2 style={{ color: "#FF1A1A" }}>공지사항</h2>
        <p style={{ color: "#fff" }}>공지사항.</p>
    </motion.div>
);

export default SectionNotice;

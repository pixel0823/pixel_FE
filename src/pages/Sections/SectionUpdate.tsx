import { SlideCustomProps, slideVariants } from "@/components/page/SlideVariants";
import { motion } from "framer-motion";

interface SectionUpdateProps extends SlideCustomProps { }

const SectionUpdate: React.FC<SectionUpdateProps> = ({ enter, exitDir }) => (
    <motion.div
        custom={{ enter, exitDir }}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%", padding: "62px 30px" }}
    >
        <h2 style={{ color: "#FF1A1A" }}>업데이트</h2>
        <p style={{ color: "#fff" }}>업데이트.</p>
    </motion.div>
);

export default SectionUpdate;

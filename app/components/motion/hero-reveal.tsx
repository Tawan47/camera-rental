"use client";

import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function HeroReveal({
  eyebrow,
  title,
  subheading,
  search,
  tags,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  subheading: React.ReactNode;
  search: React.ReactNode;
  tags: React.ReactNode;
}) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants}>{eyebrow}</motion.div>
      <motion.div variants={itemVariants}>{title}</motion.div>
      <motion.div variants={itemVariants}>{subheading}</motion.div>
      <motion.div variants={itemVariants}>{search}</motion.div>
      <motion.div variants={itemVariants}>{tags}</motion.div>
    </motion.div>
  );
}

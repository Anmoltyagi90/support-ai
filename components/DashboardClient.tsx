"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const navigate = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSettings = async () => {
    setLoading(true);
    try {
      await axios.post("/settings", {
        ownerId,
        businessName: businessName.trim(),
        supportEmail: supportEmail.trim(),
        knowledge: knowledge.trim(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ownerId) {
      return;
    }

    const handleGetDetails = async () => {
      try {
        const result = await axios.post("/settings/get", { ownerId });
        const data = result.data ?? {};
        setBusinessName(data.businessName ?? "");
        setSupportEmail(data.supportEmail ?? "");
        setKnowledge(data.knowledge ?? "");
      } catch (error) {
        console.log(error);
      }
    };

    handleGetDetails();
  }, [ownerId]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-lg font-semibold tracking-tight cursor-pointer"
            onClick={() => navigate.push("/")}
          >
            Support <span className="text-zinc-400">AI</span>
          </div>

          <button
            onClick={() => navigate.push("/embed")}
            className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition"
          >
            Embed ChartBot
          </button>
        </div>
      </motion.div>

      <div className="flex justify-center px-4 py-14 mt-20">
        <motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">ChartBot Settings</h1>
            <p className="text-zinc-500 mt-1">
              Manage your AI chatbot knowledge and business details
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-lg font-medium mb-4">Business Details</h2>

            <div className="space-y-4">
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Business Name"
                onChange={(e) => setBusinessName(e.target.value)}
                value={businessName}
              />
              <input
                type="email"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Support Email"
                onChange={(e) => setSupportEmail(e.target.value)}
                value={supportEmail}
              />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-lg font-medium mb-4">Knowledge Base</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Add FAQs, policies, delivery info, refunds, etc.
            </p>

            <textarea
              className="w-full h-54 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
              placeholder={`Example:

• Return policy: 7 days return available
• Delivery time: 3-5 working days
• Cash on Delivery available
• Support hours: Monday-Saturday, 9 AM - 6 PM
• Shipping charges: Free above ₹499
• Contact: support@company.com
• Office address: New Delhi, India
• Frequently asked questions and business policies`}
              onChange={(e) => setKnowledge(e.target.value)}
              value={knowledge}
            />
          </div>

          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              onClick={handleSettings}
              className="px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-emerald-600"
              >
                Settings saved
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardClient;

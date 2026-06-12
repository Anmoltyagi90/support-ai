"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "motion/react";

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
  const navigate = useRouter();
  const [copied, setCopied] = useState(false);
  const embedCode = ` <script
      src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
      data-owner-id="${ownerId}">
</script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-lg font-semibold cursor-pointer"
            onClick={() => navigate.push("/")}
          >
            Support <span className="text-zinc-400">AI</span>
          </div>
          <button
            className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition"
            onClick={() => navigate.push("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="flex justify-center px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10"
        >
          <h1 className="text-2xl font-semibold mb-2">Embed ChatBot</h1>
          <p>
            Copy and paste this code before <code>&lt;/body&gt;</code>
          </p>

          <div className="relative bg-zinc-900 text-zinc-100 rounded-xl p-5 text-sm font-mono mb-10">
            <pre>{embedCode}</pre>
            <button
              className="absolute top-3 right-3 bg-white text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition"
              onClick={copyCode}
            >
              {copied ? "Copied ✔️" : "Copy"}
            </button>
          </div>

          <ol
            className="space-y-3 text-sm text-zinc-600 list-decimal list-inside"
      
          >
            <li>Copy the embed script</li>
            <li>Paste it before the closing body tag</li>
            <li>Reload your website</li>
          </ol>

          <div className="mt-14">
            <h1 className="text-lg font-medium mb-2">Live Preview</h1>
            <p className="text-sm text-zinc-500 mb-6">
              This is how the chatbot will appear or your website
            </p>

            <div className="rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 h-10 bg-zinc-100 border-b border-zinc-200">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />

                <div className="ml-4 h-6 w-64 rounded-md bg-white border border-zinc-200 flex items-center px-3 text-xs text-zinc-400">
                  https://yourwebsite.com
                </div>
              </div>

              {/* Website Area */}
              <div className="relative h-[350px] bg-zinc-50 p-6 overflow-hidden">
                <div className="text-zinc-400 text-sm">
                  Your website goes here
                </div>

                {/* Chat Window */}
                <div className="absolute bottom-24 right-6 w-72 bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden">
                  <div className="bg-black text-white text-xs px-4 py-3 flex justify-between items-center">
                    <span>Customer Support</span>
                    <span className="cursor-pointer">✕</span>
                  </div>

                  <div className="p-3 space-y-3 bg-zinc-50">
                    <div className="bg-white border border-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-lg w-fit">
                      👋 Hi! How can I help you?
                    </div>

                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg ml-auto w-fit">
                      What is the return policy?
                    </div>

                    <div className="bg-white border border-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-lg w-fit max-w-[80%]">
                      Returns are accepted within 30 days of purchase.
                    </div>
                  </div>

                  <div className="border-t border-zinc-200 p-3 bg-white">
                    <input
                      disabled
                      placeholder="Type your message..."
                      className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs bg-zinc-50"
                    />
                  </div>
                </div>

                {/* Floating Chat Button */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl shadow-2xl cursor-pointer"
                >
                  💬
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmbedClient;

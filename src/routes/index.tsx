import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { Envelope } from "@/components/wedding/Envelope";
import { Countdown } from "@/components/wedding/Countdown";
import { RsvpForm } from "@/components/wedding/RsvpForm";
import { MandalaBg } from "@/components/wedding/MandalaBg";
import { Sparkles } from "@/components/wedding/Sparkles";
import { Divider } from "@/components/wedding/Divider";
import couple from "@/assets/couple.png";
import { MapPin, Clock, Flower2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dilki & Kasun — Wedding Celebration | June 4, 2026" },
      {
        name: "description",
        content:
          "Join us for the wedding of Dilki & Kasun on June 4, 2026 at The Glasgow – Brilliance Nest Ballroom, Kalagedihena. Sri Lankan traditional ceremony.",
      },
      { property: "og:title", content: "Dilki & Kasun — Wedding Celebration" },
      {
        property: "og:description",
        content: "June 4, 2026 · Kalagedihena, Sri Lanka",
      },
    ],
  }),
  component: Index,
});

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fade}
      className={`relative py-20 sm:py-28 px-5 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Toaster richColors position="top-center" />
      {!opened && <Envelope onOpen={() => setOpened(true)} />}

      {/* HERO */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden">
        <MandalaBg className="absolute -top-40 -left-40 w-[600px]" />
        <MandalaBg
          className="absolute -bottom-40 -right-40 w-[600px]"
          reverse
        />
        <Sparkles count={14} />

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={opened ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-xs sm:text-sm tracking-[0.6em] text-[var(--gold-deep)] mb-4"
        >
          ✦ TOGETHER WITH OUR FAMILIES ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={opened ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 1 }}
          className="gold-text text-6xl sm:text-8xl md:text-9xl font-bold leading-none"
        >
          Dilki
          <span className="block font-[var(--font-script)] italic text-[var(--maroon)] text-4xl sm:text-6xl my-2 not-italic">
            &
          </span>
          Kasun
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={opened ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
          className="mt-6 text-lg sm:text-xl text-[var(--maroon-deep)] tracking-[0.3em]"
        >
          WEDDING CELEBRATION
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={opened ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
          className="mt-2 font-[var(--font-script)] italic text-2xl sm:text-3xl text-[var(--gold-deep)]"
        >
          June 4th, 2026
        </motion.p>

        <motion.img
          initial={{ opacity: 0, y: 60 }}
          animate={opened ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 1.2 }}
          src={couple}
          alt="Illustration of Dilki and Kasun in traditional Sri Lankan wedding attire"
          width={600}
          height={600}
          className="mt-10 w-64 sm:w-80 md:w-96 drop-shadow-2xl animate-glow-shine animate-breathing"
        />
      </header>

      {/* COUNTDOWN */}
      <Section className="text-center">
        <Divider />
        <h2 className="gold-text text-3xl sm:text-5xl mb-3">
          Counting Every Moment
        </h2>
        <p className="text-[var(--maroon)] mb-10 italic">
          until our auspicious day
        </p>
        <Countdown />
      </Section>

      {/* DETAILS */}
      <Section className="bg-[var(--card)]">
        <MandalaBg className="absolute top-10 right-0 w-72" />
        <div className="max-w-3xl mx-auto text-center relative">
          <Divider />
          <h2 className="gold-text text-3xl sm:text-5xl mb-12">
            Wedding Details
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                label: "Venue",
                value: (
                  <>
                    <span className="text-[var(--gold-deep)] font-semibold">
                      The Glasgow
                    </span>
                    <br />
                    Brilliance Nest Ballroom, Kalagedihena
                  </>
                ),
              },
              { icon: Clock, label: "Reception", value: "9:00 AM" },
              { icon: Flower2, label: "Poruwa Ceremony", value: "9:30 AM" },
            ].map((d, index) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.75,
                  ease: "easeOut",
                  delay: index * 0.15,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-6 rounded-xl border border-[var(--gold)]/40 bg-[var(--ivory)] shadow-elegant glow-edge"
              >
                <d.icon className="w-7 h-7 mx-auto text-[var(--gold-deep)]" />
                <p className="mt-3 text-xs tracking-[0.3em] text-[var(--maroon)]">
                  {d.label.toUpperCase()}
                </p>
                <p className="mt-2 font-[var(--font-display)] text-[var(--maroon-deep)]">
                  {d.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="https://maps.app.goo.gl/pJxGNHoTReE8kLLS8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#4A0E1A] text-[#D4AF37] font-semibold rounded-full tracking-wider transition-all duration-300 hover:bg-[#6b142a] hover:shadow-lg hover:scale-105 active:scale-95"
            >
              View on Map
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V12a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </Section>

      {/* RSVP */}
      <Section>
        <MandalaBg className="absolute -bottom-20 -left-20 w-[500px]" reverse />
        <div className="max-w-xl mx-auto relative">
          <Divider />
          <h2 className="gold-text text-3xl sm:text-5xl text-center mb-3">
            Kindly RSVP
          </h2>
          <p className="text-center text-[var(--maroon)] italic mb-10">
            Your presence is our greatest blessing
          </p>
          <RsvpForm />
        </div>
      </Section>

      {/* THANK YOU */}
      <footer className="relative py-24 text-center maroon-bg overflow-hidden">
        <MandalaBg className="absolute inset-0 m-auto w-[700px] opacity-10" />
        <Sparkles count={20} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <p className="text-xs tracking-[0.5em] text-[var(--gold-soft)]">
            WITH GRATITUDE
          </p>
          <h2 className="gold-text text-4xl sm:text-6xl mt-4">Thank You</h2>
          <p className="mt-6 text-[var(--gold-soft)]/80 max-w-md mx-auto px-6 italic">
            For sharing in the joy of our beginning. May our love story inspire
            your own.
          </p>
          <p className="mt-10 font-[var(--font-script)] italic text-2xl text-[var(--gold-soft)]">
            Dilki & Kasun
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

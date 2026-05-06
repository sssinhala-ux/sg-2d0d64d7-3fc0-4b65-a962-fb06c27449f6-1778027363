import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Heart, Loader2 } from "lucide-react";

export function RsvpForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    guests: 1,
    attending: "yes" as "yes" | "no",
    message: "",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8bee4cb2-0df3-4767-9431-78c7045eb2f2",
          subject: `New RSVP from ${form.name}`,
          name: form.name,
          guests: form.guests,
          attending:
            form.attending === "yes" ? "Yes, joyfully" : "Regretfully no",
          message: form.message || "No message",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setDone(true);
        toast.success("RSVP submitted successfully!");
      } else {
        throw new Error(result.message || "Failed to submit");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-[var(--card)] rounded-2xl p-6 sm:p-10 shadow-elegant border border-[var(--gold)]/40">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="mx-auto w-20 h-20 rounded-full maroon-bg flex items-center justify-center shadow-gold-glow"
            >
              <Heart
                className="w-10 h-10 text-[var(--gold-soft)]"
                fill="currentColor"
              />
            </motion.div>
            <h3 className="gold-text text-3xl mt-6 font-bold">Thank You!</h3>
            <p className="text-[var(--maroon)] mt-2">
              Your blessing means the world to us.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm tracking-widest text-[var(--maroon)] mb-2">
                NAME *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b-2 border-[var(--gold)]/50 focus:border-[var(--gold-deep)] outline-none py-2 text-[var(--maroon-deep)]"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm tracking-widest text-[var(--maroon)] mb-2">
                  ATTENDEES
                </label>
                <input
                  name="guests"
                  type="number"
                  min={1}
                  max={10}
                  value={form.guests}
                  onChange={(e) =>
                    setForm({ ...form, guests: Number(e.target.value) })
                  }
                  className="w-full bg-transparent border-b-2 border-[var(--gold)]/50 focus:border-[var(--gold-deep)] outline-none py-2"
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest text-[var(--maroon)] mb-2">
                  ATTENDING
                </label>
                <select
                  name="attendance"
                  value={form.attending}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      attending: e.target.value as "yes" | "no",
                    })
                  }
                  className="w-full bg-transparent border-b-2 border-[var(--gold)]/50 focus:border-[var(--gold-deep)] outline-none py-2"
                >
                  <option value="yes">Yes, joyfully</option>
                  <option value="no">Regretfully no</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm tracking-widest text-[var(--maroon)] mb-2">
                MESSAGE
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full bg-transparent border-2 border-[var(--gold)]/40 focus:border-[var(--gold-deep)] outline-none rounded-lg p-3"
                placeholder="A blessing for the couple…"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full maroon-bg text-[var(--gold-soft)] py-4 rounded-lg tracking-[0.3em] text-sm font-semibold border border-[var(--gold)]/60 shadow-gold-glow hover:shadow-elegant transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              SEND RSVP
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

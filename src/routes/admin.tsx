import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  RefreshCw,
  Users,
  CheckCircle,
  XCircle,
  HelpCircle,
  Calendar,
} from "lucide-react";
import { getAllRsvps, exportRsvpsToCSV } from "@/services/rsvpService";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

// @ts-expect-error - Route auto-generation pending
export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type RsvpRow = Database["public"]["Tables"]["rsvps"]["Row"];

function AdminPage() {
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRsvps = async () => {
    setLoading(true);
    try {
      const data = await getAllRsvps();
      setRsvps(data);
      toast.success(`Loaded ${data.length} RSVPs`);
    } catch (error) {
      console.error("Failed to load RSVPs:", error);
      toast.error("Failed to load RSVPs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRsvps();
  }, []);

  const handleExport = () => {
    const csv = exportRsvpsToCSV(rsvps);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wedding-rsvps-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("RSVPs exported!");
  };

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.attending === "yes").length,
    notAttending: rsvps.filter((r) => r.attending === "no").length,
    maybe: rsvps.filter((r) => r.attending === "maybe").length,
    totalGuests: rsvps
      .filter((r) => r.attending === "yes")
      .reduce((sum, r) => sum + r.guests, 0),
  };

  return (
    <div className="min-h-screen bg-[var(--ivory)] py-12 px-5">
      <Toaster richColors position="top-center" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="gold-text text-5xl font-bold mb-2">RSVP Admin</h1>
          <p className="text-[var(--maroon)]">Dilki & Kasun's Wedding</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Total RSVPs",
              value: stats.total,
              icon: Users,
              color: "maroon",
            },
            {
              label: "Attending",
              value: stats.attending,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "Not Attending",
              value: stats.notAttending,
              icon: XCircle,
              color: "red",
            },
            {
              label: "Maybe",
              value: stats.maybe,
              icon: HelpCircle,
              color: "amber",
            },
            {
              label: "Total Guests",
              value: stats.totalGuests,
              icon: Calendar,
              color: "gold",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-elegant border border-[var(--gold)]/30"
            >
              <stat.icon className={`w-6 h-6 mb-2 text-${stat.color}-600`} />
              <p className="text-3xl font-bold text-[var(--maroon-deep)]">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--maroon)] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6 justify-end">
          <button
            onClick={loadRsvps}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--maroon)] text-[var(--gold-soft)] rounded-lg hover:bg-[var(--maroon-deep)] transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            disabled={rsvps.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--gold-deep)] text-white rounded-lg hover:bg-[var(--gold)] transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-elegant border border-[var(--gold)]/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--maroon)] text-[var(--gold-soft)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Guests
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--gold)]/20">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-[var(--maroon)]"
                    >
                      Loading RSVPs...
                    </td>
                  </tr>
                ) : rsvps.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-[var(--maroon)]"
                    >
                      No RSVPs yet
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp, index) => (
                    <motion.tr
                      key={rsvp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-[var(--ivory)]/50 transition"
                    >
                      <td className="px-6 py-4 text-[var(--maroon-deep)] font-semibold">
                        {rsvp.name}
                      </td>
                      <td className="px-6 py-4 text-[var(--maroon)] text-sm">
                        {rsvp.email && <div>{rsvp.email}</div>}
                        {rsvp.phone && <div>{rsvp.phone}</div>}
                        {!rsvp.email && !rsvp.phone && (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-[var(--maroon-deep)] font-bold">
                        {rsvp.guests}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            rsvp.attending === "yes"
                              ? "bg-green-100 text-green-700"
                              : rsvp.attending === "no"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {rsvp.attending === "yes" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : rsvp.attending === "no" ? (
                            <XCircle className="w-3 h-3" />
                          ) : (
                            <HelpCircle className="w-3 h-3" />
                          )}
                          {rsvp.attending === "yes"
                            ? "Yes"
                            : rsvp.attending === "no"
                              ? "No"
                              : "Maybe"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--maroon)] text-sm max-w-xs">
                        {rsvp.message ? (
                          <div className="line-clamp-2">{rsvp.message}</div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[var(--maroon)] text-xs">
                        {rsvp.created_at ? new Date(rsvp.created_at).toLocaleString() : "-"}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type RsvpInsert = Database["public"]["Tables"]["rsvps"]["Insert"];
type RsvpRow = Database["public"]["Tables"]["rsvps"]["Row"];

export async function submitRsvp(data: Omit<RsvpInsert, "id" | "created_at">) {
  const { data: result, error } = await supabase
    .from("rsvps")
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("RSVP submission error:", error);
    throw new Error(error.message);
  }

  return result;
}

export async function getAllRsvps(): Promise<RsvpRow[]> {
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("Query:", { data, error });
  if (error) {
    console.error("Error fetching RSVPs:", error);
    throw new Error(error.message);
  }

  return data || [];
}

export function exportRsvpsToCSV(rsvps: RsvpRow[]): string {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Guests",
    "Attending",
    "Message",
    "Date",
  ];
  const rows = rsvps.map((r) => [
    r.name,
    r.email || "",
    r.phone || "",
    r.guests.toString(),
    r.attending,
    r.message || "",
    r.created_at ? new Date(r.created_at).toLocaleString() : "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csvContent;
}

import { createClient } from "@supabase/supabase-js";

// connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { text } = req.body;

    let prediction = "Unknown";
    const t = text.toLowerCase();

    // 🔥 smarter logic (based on your dataset)
    if (t.includes("python") || t.includes("machine learning") || t.includes("data")) {
      prediction = "Data Science";
    } 
    else if (t.includes("java") || t.includes("spring") || t.includes("backend")) {
      prediction = "Software Developer";
    } 
    else if (t.includes("sql") || t.includes("database") || t.includes("mysql")) {
      prediction = "Database";
    } 
    else if (t.includes("html") || t.includes("css") || t.includes("frontend")) {
      prediction = "Web Developer";
    } 
    else if (t.includes("marketing") || t.includes("sales")) {
      prediction = "Marketing";
    }

    // 💾 store in Supabase
    await supabase.from("resumes").insert([
      {
        resume_text: text,
        prediction: prediction,
      },
    ]);

    return res.status(200).json({ prediction });

  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
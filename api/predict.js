import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const { name, email, education, text } = req.body;

    console.log("BODY:", req.body); // 🔥 must show in logs

    let prediction = "Unknown";
    const t = text.toLowerCase();

    if (t.includes("python") || t.includes("machine learning")) {
      prediction = "Data Science";
    } 
    else if (t.includes("java") || t.includes("backend")) {
      prediction = "Software Developer";
    } 
    else if (t.includes("sql")) {
      prediction = "Database";
    } 
    else if (t.includes("html") || t.includes("css") || t.includes("react")) {
      prediction = "Web Developer";
    }

    const { error } = await supabase.from("resumes").insert([
      {
        name: name,
        email: email,
        education: education,
        resume_text: text,
        prediction: prediction,
      },
    ]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ prediction });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
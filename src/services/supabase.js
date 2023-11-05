import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ngmcoyptcrlhiufehpyc.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nbWNveXB0Y3JsaGl1ZmVocHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTE5MDksImV4cCI6MjAxMzY2NzkwOX0.dW7_laSuYWsHCTX0x1IFvSll-Ks5NW342TqoQ2uyRJ4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

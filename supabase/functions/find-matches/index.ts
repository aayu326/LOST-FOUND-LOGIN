import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface MatchRequest {
  item_id: string;
  item_type: 'lost' | 'found';
  image_url?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { item_id, item_type }: MatchRequest = await req.json();

    let currentItem;
    let itemsToCompare;

    if (item_type === 'lost') {
      const { data } = await supabase
        .from('lost_items')
        .select('*')
        .eq('id', item_id)
        .maybeSingle();
      currentItem = data;

      const { data: foundItems } = await supabase
        .from('found_items')
        .select('*')
        .eq('status', 'active');
      itemsToCompare = foundItems || [];
    } else {
      const { data } = await supabase
        .from('found_items')
        .select('*')
        .eq('id', item_id)
        .maybeSingle();
      currentItem = data;

      const { data: lostItems } = await supabase
        .from('lost_items')
        .select('*')
        .eq('status', 'active');
      itemsToCompare = lostItems || [];
    }

    if (!currentItem) {
      return new Response(
        JSON.stringify({ error: 'Item not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const matches = [];

    for (const item of itemsToCompare) {
      const score = calculateSimilarity(currentItem, item);
      
      if (score >= 30) {
        const matchData = item_type === 'lost' 
          ? { lost_item_id: item_id, found_item_id: item.id, similarity_score: score }
          : { lost_item_id: item.id, found_item_id: item_id, similarity_score: score };

        const { error } = await supabase
          .from('matches')
          .upsert(matchData, { onConflict: 'lost_item_id,found_item_id' });

        if (!error) {
          matches.push({ ...matchData, item });
        }
      }
    }

    return new Response(
      JSON.stringify({ matches }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function calculateSimilarity(item1: any, item2: any): number {
  let score = 0;

  if (item1.color.toLowerCase() === item2.color.toLowerCase()) {
    score += 30;
  } else if (item1.color.toLowerCase().includes(item2.color.toLowerCase()) || 
             item2.color.toLowerCase().includes(item1.color.toLowerCase())) {
    score += 15;
  }

  if (item1.location.toLowerCase() === item2.location.toLowerCase()) {
    score += 25;
  } else if (item1.location.toLowerCase().includes(item2.location.toLowerCase()) || 
             item2.location.toLowerCase().includes(item1.location.toLowerCase())) {
    score += 12;
  }

  const titleSimilarity = stringSimilarity(item1.title.toLowerCase(), item2.title.toLowerCase());
  score += titleSimilarity * 25;

  const descSimilarity = stringSimilarity(item1.description.toLowerCase(), item2.description.toLowerCase());
  score += descSimilarity * 20;

  const dateField1 = item1.date_lost || item1.date_found;
  const dateField2 = item2.date_lost || item2.date_found;
  const date1 = new Date(dateField1);
  const date2 = new Date(dateField2);
  const daysDiff = Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff <= 7) {
    score += 10;
  } else if (daysDiff <= 14) {
    score += 5;
  }

  return Math.min(Math.round(score), 100);
}

function stringSimilarity(str1: string, str2: string): number {
  const words1 = str1.split(/\s+/);
  const words2 = str2.split(/\s+/);
  
  let matches = 0;
  const maxWords = Math.max(words1.length, words2.length);
  
  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1 === word2 && word1.length > 2) {
        matches++;
      } else if (word1.includes(word2) || word2.includes(word1)) {
        matches += 0.5;
      }
    }
  }
  
  return maxWords > 0 ? matches / maxWords : 0;
}

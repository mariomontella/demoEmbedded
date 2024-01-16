import { config } from "dotenv";
config();

import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { createClient } from '@supabase/supabase-js'

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseKey) throw new Error('Expected SUPABASE_SERVICE_ROLE_KEY');

const url = process.env.SUPABASE_URL;
if (!url) throw new Error('Expected env var SUPABASE_URL');

export const search = async () => {
    const client = createClient(url, supabaseKey);

    const vectorStore = await SupabaseVectorStore.fromExistingIndex({
        client,
        tableName: 'documents',
        queryName: 'match_documents',
    });

    const resultOne = await vectorStore.similaritySearch('Hai qualcosa su Milano?', 1);
    console.log(resultOne);
}

search();

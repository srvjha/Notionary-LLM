import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const visited = new Set();
const urlsToIndex: string[] = [];

/**
 * Crawl website recursively to collect URLs
 */
async function crawl(url: string, depth = 0, maxDepth = 1) {
  if (visited.has(url) || depth > maxDepth) return;
  visited.add(url);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Save this URL for indexing
    urlsToIndex.push(url);

    // Extract links
    const links = $("a[href]")
      .map((_, el) => {
        const href = $(el).attr("href");
        if (!href) return null; // skip undefined
        return new URL(href, url).toString();
      })
      .get()
      .filter((link): link is string => link !== null); // type guard to remove nulls

    for (const link of links) {
      await crawl(link, depth + 1, maxDepth);
    }
  } catch (err: any) {
    console.error("Failed to crawl:", url, err.message);
  }
}

/**
 * Fetch page text
 */
async function fetchPageText(url: string) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $("body").text(); // simple extract, can refine
  } catch (err: any) {
    console.error("Failed to fetch:", url, err.message);
    return "";
  }
}

/**
 * Main indexing pipeline
 */
export const webIndexing = async (startUrl: string, collectionName: string) => {
  console.log("🚀 Crawling site...");
  await crawl(startUrl, 0, 1); // maxDepth=1 → subpages, increase if needed
  console.log(`✅ Found ${urlsToIndex.length} URLs`);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "models/embedding-001", // Correct Gemini embeddings model
  });

  let allDocs: any[] = [];

  for (const url of urlsToIndex) {
    const text = await fetchPageText(url);
    if (!text) continue;

    // Split into chunks
    const docs = await splitter.createDocuments([text], [{ url }]);
    allDocs = allDocs.concat(docs);
  }

  console.log(
    `📖 Created ${allDocs.length} chunks from ${urlsToIndex.length} pages`
  );

  // Store in Qdrant
  const vectorStore = await QdrantVectorStore.fromDocuments(
    allDocs,
    embeddings,
    {
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      collectionName: collectionName,
    }
  );

  console.log("🎉 Indexing complete! Stored in Qdrant.");
  return true;
};

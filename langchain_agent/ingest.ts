import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

async function ingestPDF() {
    console.log("🚀 Starting PDF Ingestion Process...");

    try {
        // 1. Load the PDF file
        console.log("📄 Reading PDF file...");
        const loader = new PDFLoader("./Documents/Projectel_Case+Study.pdf"); 
        const rawDocs = await loader.load();
        console.log(`✅ Loaded ${rawDocs.length} pages from the PDF.`);

        // 2. Split the text
        console.log("✂️  Splitting text into overlapping chunks...");
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,   
            chunkOverlap: 200, 
        });
        const splitDocs = await textSplitter.splitDocuments(rawDocs);

        console.log(splitDocs);

        // 3. ✨ THE FIX: Strip out the complex metadata ✨
        console.log("🧹 Cleaning up document metadata...");
        const cleanDocs = splitDocs.map((doc) => {
            // Make a copy of the metadata
            const cleanMetadata = { ...doc.metadata };
            // Delete the complex objects that crash Chroma
            delete cleanMetadata.pdf;
            delete cleanMetadata.loc; 
            
            return {
                ...doc,
                metadata: cleanMetadata
            };
        });
        console.log(`✅ Cleaned ${cleanDocs.length} chunks.`);

        // 4. Initialize the OpenAI Embeddings engine
        const embeddings = new OpenAIEmbeddings({
            modelName: "text-embedding-3-small", 
        });

        // 5. Send chunks to ChromaDB
        console.log("🧠 Generating embeddings and saving to ChromaDB...");
        await Chroma.fromDocuments(cleanDocs, embeddings, {
            collectionName: "pdf_documents",
            url: "http://localhost:8080", 
        });

        console.log("🎉 Success! Your PDF has been fully vectorized and stored in ChromaDB.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error during ingestion:", error);
        process.exit(1);
    }
}

ingestPDF();
import  {z } from "zod";
import {tool } from "@langchain/core/tools";
import {Chroma } from "@langchain/community/vectorstores/chroma";
import {OpenAIEmbeddings} from "@langchain/openai";


const embeddings= new OpenAIEmbeddings({
    modelName: "text-embedding-3-small"
})

const vectorStore= await Chroma.fromExistingCollection(embeddings,{
    collectionName: "pdf_documents",
    url: "http://localhost:8080"
})

const retrieveSchema=z.object({
    query:z.string().describe("A highly specific search query to find information in the document.")
})

export const pdfRetrievalTool= tool(
    async({query})=>{
        console.log(` AI is searching for the ${query}`);

        const retrieveDocs= await vectorStore.similaritySearch(query,3);

        const serialized = retrieveDocs.map((doc)=>`Content: ${doc.pageContent}`)
        .join("\n\n---\n\n");


        return serialized;
    },{
        name: "pdf_retriever",
        description: "Use this tool ONLY when you need to answer questions about company policies, technical documents, or uploaded PDF content. Do NOT use this for finding user account details.",
        schema: retrieveSchema,
    }
)






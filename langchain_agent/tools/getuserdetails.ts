import {tool} from "@langchain/core/tools";
import {z} from "zod";

export const getuserDetails = tool(
    async(input)=>{
        return `The user details are: 
                name: ${input.username},
                age:${input.age},
                organization:${input.organization},
                email:${input.email}`
    },{
        name: "getuserdetails",
        description: "Extarct and save the details of the user like their name and age and their organization",
        schema: z.object({
            username:z.string().describe("The full name or username of the user e.g., Akash Kumar"),
            age:z.string().describe("The age of the user as a number e.g., 23"),
            organization:z.string().describe("The organization in which the user is working e.g., Intracom"),
            email:z.string().describe("The email of the user e.g., akashkumar@gmail.com")
        }),
    }
);
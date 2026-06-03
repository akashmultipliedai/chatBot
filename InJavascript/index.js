
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { res as AskAi } from './services/helperfunction.js'


async function getanswer() {
   const rl = readline.createInterface({ input, output });

   try {
      const inputprompt = await rl.question('Enter your question: ');

      const result = await AskAi(inputprompt);
      console.log(result);
      if (result) {
         console.log(result.output_text);
      }
   } catch (error) {
      console.log(error);
   } finally {
      rl.close();
   }

}

getanswer();
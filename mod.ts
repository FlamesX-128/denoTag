import { cryptoRandomString } from "./deps.ts";

/**
 * This function takes care of rendering the <deno> tag.
 * @param {string} filePath - This is the path of the file to render.
 * @returns {Promise<string>}
 */
async function render(filePath: string, data?: Record<string, unknown>): Promise<string> {
  if (!Deno.statSync(filePath))
    throw new Error(`The file with the path "${filePath}" does not exist!`);


  /**
   * create a utf-8 decoder
   * @type {TextDecoder}
   */
  const decoder: TextDecoder = new TextDecoder("utf-8");


  /**
   * Finds the position of the deno tag, either when it opens or closes.
   * @param {string} file - The file to analyze.
   * @param {string} tag - The tag to search for, either <deno> or </deno>.
   * @param {number} pos - The last position that was reviewed.
   * @returns {Promise<number>}
   */
  async function searchTag(file: string, tag: string, pos: number): Promise<number> {
    /**
     * Gets the position of the tag.
     * @type {number}
     */
    const target: number = file.indexOf(tag, pos);

    /**
     * Gets the position when a comment was opened.
     * @type {number}
     */
    const openComment: number = file.indexOf("<!--", pos),
      /**
       * Gets the position when a comment was closed
       * @type {number}
       */
      closeComment: number = file.indexOf("-->", pos);


    if (target < 0)
      return -1;

    else if ((openComment < target) && (target < closeComment))
      return await searchTag(file, tag, (closeComment + 3));

  
    return target;
  }

  const asyncFunction: FunctionConstructor = Object.getPrototypeOf(async function(){}).constructor;

  return await (
    /**
     * This function is in charge of searching and rendering all deno tags.
     * @param {string} file - This will be the file to return when rendering is finished.
     * @returns {Promise<string>}
     */
    async function lookingDeno(file: string): Promise<string> {
      /** 
       * This is where the deno tag starts.
       * @type {number} 
       */
      const open: number = await searchTag(file, "<deno>", 0);

      
      if (open < 0) return file;

    
      /** 
       * This is where the deno tag ends.
       * @type {number}
       */
      const close: number = await searchTag(file, "</deno>", 0);

  
      if (close < 0) throw new Error("Unterminated deno tag!");

  
      /** 
       * This creates a crypto.
       * @type {string}
       */
      const crypto: string = cryptoRandomString({
        type: "alphanumeric",
        length: 32
      });


      /** 
       * This is a variable with a random name, this to prevent someone external from modifying the values.
       * @type {string}
       */
      const privateVar = `a${crypto}z`;

      /**
       * This creates a function with the code to execute and receives the return.
       * @type {string[]}
       */
      const result: string[] = await new asyncFunction("data", `
        /**
         * This is the variable in charge of receiving and returning the changes in the html.
         * @type {string[]} 
         */
        let ${privateVar} = [];


        /**
         * This function assigns a new value to the secret variable.
         * @returns {void} 
         */
        function write(toWrite) {
          ${privateVar}.push(toWrite)
        };
        

        /**
         * This function is responsible for executing the code declared in the deno tag.
         * @returns {Promise<void> | void} 
         */
        await (async function main() {
          ${file.slice(open+6, close)}
        })();


        return ${privateVar};
      `)(data);

      return await lookingDeno(
        file.replace(file.slice(open, close + 7), result.join("\n"))
      );
    }
  )(decoder.decode(Deno.readFileSync(filePath)));
}

export default render;
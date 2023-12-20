import OpenAI from "openai";


const open_ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "", });

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export const strict_output = async (
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false,
) => {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_message: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output ${(list_output) && "an array of objects in"} the following in json format: ${JSON.stringify(output_format)}. \n
    Please do not put quotaion marks aroung or escape characters in the output fields.  \n`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list. \n`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. 
Example input: Got to <location>, Example output: Got to the garden¸\n
Any output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>':'description of location'}, Example output: { 'school': 'a place for education'}
`
    }

    if (list_input) {
      output_format_prompt += `\nGenerate an array of json, on json for each input element.`;
    }

    const response = await open_ai.chat.completions.create({ temperature, model, messages: [{ role: "system", content: system_prompt + output_format_prompt + error_message }, { role: "user", content: user_prompt.toString() }] }).withResponse();

    let res: string = response.data.choices[0].message?.content?.replace(/'/g, '"') ?? "";

    res = res.replace(/(\w)"(\w)/g, "$1'$2");

    if (verbose) {
      console.log("System prompt:", system_prompt + output_format_prompt + error_message);
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    try {
      let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in an array of json");
        }
      } else {
        output = [output];
      }

      for (let idx = 0; idx < output.length; idx++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) {
            continue;
          }

          if (!(key in output[idx])) {
            throw new Error(`${key} not in json output`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];


            if (Array.isArray(output[idx][key])) {
              output[idx][key] = output[idx][key][0];
            }

            if (!choices.includes(output[idx][key]) && default_category) {
              output[idx][key] = default_category;
            }

            if (output[idx][key].includes(":")) {
              output[idx][key] = output[idx][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[idx] = Object.values(output[idx]);

          if (output[idx].length === 1) {
            output[idx] = output[idx][0];
          }
        }
      }
      return (list_input) ? output : output[0];

    } catch (error: any) {
      error_message = `\n\nResult: ${res}\n\nError message: ${error.message}`;
      console.log("An exception occurred:", error);
      console.log("Current invalid json format", res);
    }
  }
}

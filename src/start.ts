import { gemini, googleAI } from '@genkit-ai/googleai'
import 'dotenv/config'
import { genkit, z } from 'genkit'

async function main() {
  const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
    model: gemini('gemini-2.0-flash'),
    promptDir: 'src/prompts',
  })

  // Define a simple temperature tool which gives a random temperature for the given city.
  ai.defineTool(
    {
      name: 'temperature',
      description: 'Gets current temperature in the given city',
      inputSchema: z.object({
        city: z
          .string()
          .describe('The city to get the current temperature for'),
      }),
      outputSchema: z.string(),
    },
    async ({ city }) => {
      try {
        const temperature = (Math.random() * (40 + 10) - 10).toFixed(0)
        return `${temperature}°C`
      } catch (error: any) {
        return error.message
      }
    }
  )

  // Get the list of 5 largest cities in the world using the cities prompt.
  const citiesPrompt = await ai.prompt('cities')
  const { text: citiesText } = await citiesPrompt({ num: 5 })

  const { cities } = JSON.parse(citiesText)

  // Get temperature for each city through the temperature prompt.
  const temperaturePrompt = await ai.prompt('temperature')
  const { text: temperatureText } = await temperaturePrompt(
    { cities },
    { maxTurns: 10 }
  )

  console.log(temperatureText)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})

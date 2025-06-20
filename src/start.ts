import { gemini, googleAI } from '@genkit-ai/googleai'
import 'dotenv/config'
import { genkit, z } from 'genkit'

async function main() {
  const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
    model: gemini('gemini-2.0-flash'),
    promptDir: 'src/prompts',
  })

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

  const citiesPrompt = await ai.prompt('cities')
  const { text: citiesText } = await citiesPrompt()

  const { cities } = JSON.parse(citiesText)

  const temperaturePrompt = await ai.prompt('temperature')
  const { text: temperatureText } = await temperaturePrompt(
    { cities },
    { maxTurns: 6 }
  )

  console.log(temperatureText)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})

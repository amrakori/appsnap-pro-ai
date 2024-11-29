import OpenAI from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key is not set. AI image generation will not work.');
}

export const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key',
  dangerouslyAllowBrowser: true,
});

export async function generateImage(prompt: string): Promise<string | null> {
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add your API key to the environment variables.');
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `App store screenshot: ${prompt}`,
      n: 1,
      size: "1024x1792",
    });

    return response.data[0].url || null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}
import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';
import { Configuration, OpenAIApi } from 'openai';

const REGION = 'us-east-1';
const ssmClient = new SSMClient({ region: REGION });

export const handler = async (event) => {

  const parameterName = '/eliana/OPEN_API_KEY';

  try {
    const params = {
      Names: [parameterName],
      WithDecryption: true
    };

    const command = new GetParametersCommand(params);
    const response = await ssmClient.send(command);

    const secretValue = response.Parameters[0].Value;
    console.log('Valor del secreto:', secretValue);

    const configuration = new Configuration({
      apiKey: secretValue
    });

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: JSON.parse(event.body).input.question, 
      temperature: 0.6,
      echo: false,
      max_tokens: 2048,
    });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify({ Answer: completion.data.choices[0].text }),
  };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener el secreto' })
    };
  }

};

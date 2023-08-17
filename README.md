# Construyendo nuestra EL·[IA]·NA con AWS y ChatGPT

## ¿Qué es **EL**·[IA]·NA?

Nuestro asistente de voz EL·[**IA]·**NA es una solución web que aprovecha las ventajas de la computación en la nube con los servicios *serverless* que proporciona AWS para conectarnos a la **API de OpenAI** y así poder tener rápidamente un asistente por voz que utilice **ChatGPT** y **Amazon Polly**.

La solución por el lado de front fue realizada con **ReactJS** y utilizamos **Web Audio API** para agregar el componente de audio a la aplicación web. Para agilizar la creación de la aplicación web, usamos **AWS Amplify** el cual nos ayudará a configurar el front con **ReactJS**, proporcionando el alojamiento con CloudFront y S3 y el back con nuestro API Gateway

![Diagrama.png](https://github.com/alfalfita/eliana-gpt/blob/main/images/Diagrama.png)

Nuestro **API Gateway** tiene un endpoint *`/call`* de tipo **POST** que recibe un *JSON* que contiene la pregunta a enviar. Este API Gateway se conecta a una función Lambda **(NodeJs v18)** que se encargará de comunicarse con la **API de OpenAI** por medio del **SDK de OPenAI** usando una *clave API* que esta guardada en una cadena segura dentro **SSM Parameter Store**.

La respuesta que retorne la función **lambda** a nuestro **API Gateway** luego será procesada para su transformación de texto a voz usando **Amazon Polly,** audio que luego emplearemos en la aplicación web usando la **Web Audio API,** una API que permite la manipulación y procesamiento de audio en aplicaciones web. 

## **¿Qué es AWS Amplify?**

Es un framework que nos ayuda en todo el ciclo de vida de nuestras aplicaciones en la nube, permitiéndonos crear aplicaciones escalables y seguras de manera rápida y sencilla. 

Simplifica el proceso de desarrollo de aplicaciones, al no tener que preocuparnos por configurar servidores o servicios de infraestructura.

## Componentes de **AWS Amplify**

Tiene diferentes componentes que podemos usar, en este caso usaremos los siguientes componentes:

- hosting
- auth
- api
- predictions
- function

## ¡Manos a la obra!

**1 - Pre-requisitos:** 

Para la configuración inicial podemos seguir la **[documentación](https://docs.amplify.aws/lib/project-setup/prereq/q/platform/js/)**

[https://docs.amplify.aws/start/getting-started/installation/q/integration/react/](https://docs.amplify.aws/start/getting-started/installation/q/integration/react/)

Una vez listo, podemos continuar con nuestro siguiente paso para crear los recursos necesarios para desplegar nuestra aplicación con AWS Amplify

**2 - Crear una aplicación fullstack con Amplify y React:** 

[https://docs.amplify.aws/start/getting-started/setup/q/integration/react/](https://docs.amplify.aws/start/getting-started/setup/q/integration/react/)

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled.png)

**3 - Agregar hosting:**

 `amplify add hosting`

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%201.png)

**4 - Agregar autenticación:**

`amplify add auth`

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%202.png)

**5 - Crear login-UI:**

[https://docs.amplify.aws/start/getting-started/auth/q/integration/react/#create-login-ui](https://docs.amplify.aws/start/getting-started/auth/q/integration/react/#create-login-ui)

**6 - Agregar API REST:** 

`amplify add api`

En esta sección configuraremos nuestro **API Gateway** y la función lambda a invocar que crearemos a partir de un template: *“Hello World”*

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%203.png)

**7 - Modificar la función lambda**

Para usar el SDK  se requiere una clave API que se puede generar en su cuenta de ChatGPT

[https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%204.png)

Para el valor de la API lo guardaremos en una cadena segura SSM Parameter Store.

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%205.png)

Que luego recuperaremos desde nuestra función lambda

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%206.png)

La función esencialmente llamará a la [API ChatGpt OpenAI](https://www.npmjs.com/package/openai) emitiendo una llamada a la API ***createCompletion*** para obtener la respuesta de ChatGPT.

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%207.png)

> El SDK de OpenAI tiene una amplia lista de modelos de IA, en este caso usamos GPT-3 con el modelo *“text-davinci -003”*
> 

**8 - Agregar predicciones:**

Es una solución para usar servicios en la nube de IA y ML para mejorar su aplicación y utiliza Amazon Polly para la capacidad de texto a voz: 

[https://docs.amplify.aws/lib/predictions/getting-started/q/platform/js/](https://docs.amplify.aws/lib/predictions/getting-started/q/platform/js/)

`amplify add predictions`

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%208.png)

**9 - Trabajando en el front con el objeto Predictions y la Web Audio API**

Este objeto expone una **API REST** que permite ejecutar acciones AI/ML y utiliza **Amazon Polly** (para nuestra solución usamos la voz en español de “Mia”) 

La respuesta se convierte en voz y representa un flujo de datos que se puede usar en la **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** para transmitir el sonido.

Usa `result.audioStream` para pasar a las API de audio web.

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%209.png)

La [**Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)**  aprovecha para recibir el flujo de voz como entrada y decodificarlo para que pueda enviarse al micrófono y producir un sonido real.

**110- El uso de [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) en el front**

Es una API que permite incorporar datos de voz en aplicaciones web. Tiene dos partes: SpeechSynthesis (rexto a voz) y SpeechRecognition (Reconocimiento de voz asíncrono).

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%2010.png)

**12** -  **Aprovisionar los recursos:** 

`amplify publish`

Este comando además de subir nuestros cambios al **bucket S3** y crear la distribución de **CloudFront** y demás recursos, también genera el build del proyecto.

Una vez completado el proceso, nos arrojará el endpoint de la distribución de **CloudFront** que usaremos para acceder a nuestra aplicación web.

**13** -  **Registro/Login**

Al ingresar a la aplicación web se mostrará la **UI de Cognito**, donde debemos crear un nuevo usuario para entrar a la aplicación.

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%2011.png)

**12** - **Probando la aplicación**

Una vez tengamos la sesión iniciada, haremos click sobre el icono del micrófono para decir nuestra pregunta, cuando finalicemos se que generará la llamada a nuestro **API Gateway** y tendremos el resultado en audio y texto.

![Untitled](https://github.com/alfalfita/eliana-gpt/blob/main/images/Untitled%2012.png)


**To cloud and beyond!** 🚀

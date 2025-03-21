const fs = require("fs/promises");
const brianInteraction = async (prompt) => {
  // Código
  /*let messages = [
    {
      sender: "user",
      content: "",
    },
  ];*/
  let messages = JSON.parse(await fs.readFile("./context.json", "utf-8"));
  console.log({ messages });
  const dataFetch = await fetch("https://api.brianknows.org/api/v0/agent", {
    method: "POST",
    headers: {
      "X-Brian-Api-Key": "brian_nxaeZheS2B2WG6n0g",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      address: "0x777c79841a5926FB631d4D581f6A2c5AF5fe7792",
      chainId: "43114",
      kbId: "public-knowledge-box",
      messages: messages,
    }),
  });

  // Métodos de API más comunes son:
  // GET, POST, PUT, PATCH, DELETE
  // GET, DELETE: envia datos mediante la query en la misma URL
  // POST, PUT: envia datos a traves de un body, por fuera de la URL

  // Esperar a que dataFetch sea algo o tenga una respuesta
  // antes de ejecutar la siguiente linea de código

  const data = await dataFetch.json();
  console.log({ data });
  if (data.error) {
    if (messages.length == 1) {
      messages[0].content = prompt;
    }
    messages.push({
      sender: "brian",
      content: data.error,
    });
    await fs.writeFile("./context.json", JSON.stringify(messages));
  } else if (data.result) {
    console.log({ result: JSON.stringify(data.result) });
  }
};

brianInteraction(
  "La dirección pública es: 0x9B1B2994A03877F5C52b10cb2276b82A19ceb2F2"
);


brianInteraction("Quiero enviarle 100 USDC a la wallet de mi amigo");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { orderData, cartData } = req.body;
    console.log("data", cartData);
    // Ici, vous pouvez traiter les données envoyées par le client comme vous le souhaitez

    res.status(200).json({ message: "Les données ont été reçues avec succès" });
  } else {
    res.status(405).json({ error: "La méthode HTTP n'est pas autorisée" });
  }
}

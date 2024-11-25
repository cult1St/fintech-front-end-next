// pages/api/getBanks.js
export default async function handler(req, res) {
    const searchTerm = req.query.search || '';


    const response = await fetch("http://127.0.0.1:8000/api/get_banks");
        if(!response.ok){
          toast.error("Registration failed");
        }
        const banks = await response.json()
    // Simulate fetching data from a database or external API
    

    // Filter banks based on the search term
    const filteredBanks = banks.filter(bank =>
        bank.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.status(200).json(filteredBanks);
}

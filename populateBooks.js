const axios = require("axios");

const salvarLivros = async (titulo) => {
    try {
        console.log(`Tentando salvar livros para o título: ${titulo}`);
        const response = await axios.post("http://localhost:5000/livros/salvar-livros", {
            titulo,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(`Livros salvos para o título: ${titulo}`);
    } catch (error) {
        console.log(error.response?.data || error.message); // Adicione esta linha
        console.error(`Erro ao salvar livros para o título "${titulo}":`, error.response?.data || error.message);
    }
};

const main = async () => {
    const titulos = ["JavaScript", "React Native", "Machine Learning", "Harry Potter", "Python", "Tecnologia", "Java", "PHP", "Node.js", "Angular", "Vue.js", "Banco de Dados", "SQL", "NoSQL", "HTML", "CSS", "Desenvolvimento Web", "Programação", "Algoritmos", "Ciência de Dados", "Inteligência Artificial", "DevOps", "Cloud Computing", "Segurança da Informação", "Blockchain", "Internet das Coisas (IoT)", "Realidade Aumentada (AR)", "Realidade Virtual (VR)", "Design de Software", "Arquitetura de Sistemas"];

    for (const titulo of titulos) {
        await salvarLivros(titulo);
    }

    console.log("Processo concluído!");
};

main();
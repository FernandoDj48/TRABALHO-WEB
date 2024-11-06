document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://rickandmortyapi.com/api/episode";
    const episodeList = document.getElementById("episode-list");

    async function getCharacterImages(characterUrls) {
        const images = [];
        for (const url of characterUrls) {
            const response = await fetch(url);
            const character = await response.json();
            images.push(character.image);
        }
        return images;
    }

    function createEpisodeCard(episode) {
        const card = document.createElement("div");
        card.classList.add("episode-card");

        const title = document.createElement("h2");
        title.textContent = episode.name;
        card.appendChild(title);

        const airDate = document.createElement("p");
        airDate.textContent = `Data de Lançamento: ${episode.air_date}`;
        card.appendChild(airDate);

        const episodeCode = document.createElement("p");
        episodeCode.textContent = `Código do Episódio: ${episode.episode}`;
        card.appendChild(episodeCode);

        const characterCount = document.createElement("p");
        characterCount.textContent = `Total de Personagens: ${episode.characters.length}`;
        card.appendChild(characterCount);

        const characterImagesDiv = document.createElement("div");
        characterImagesDiv.classList.add("character-images");

        getCharacterImages(episode.characters).then(images => {
            images.forEach(imgUrl => {
                const img = document.createElement("img");
                img.src = imgUrl;
                img.alt = "Personagem";
                characterImagesDiv.appendChild(img);
            });
        });

        card.appendChild(characterImagesDiv);

        return card;
    }

    async function fetchEpisodes() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const episodes = data.results;

            episodeList.innerHTML = "";

            episodes.forEach((episode) => {
                const episodeCard = createEpisodeCard(episode);
                episodeList.appendChild(episodeCard);
            });
        } catch (error) {
            console.error("Erro ao buscar dados da API", error);
        }
    }

    fetchEpisodes();
});

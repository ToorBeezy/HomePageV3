export const getImages = (length, workesExampleArr) => {

    return fetch(`https://api.thecatapi.com/v1/breeds`)
        .then((response) => response.json())
        .then((response) => {
            const images = [];
            workesExampleArr.forEach(e => {
                const title = e.title;
                const url = e.src
                images.push({ title, url });
            })
            return images.slice(0, length); // remove the extra cats
        });
};

export const storage = {
    getItem: (key) => {
        let itemInStorage = localStorage.getItem(key);

        if (itemInStorage !== null) {
            itemInStorage = JSON.parse(itemInStorage);
        }

        return itemInStorage;
    },
    setItem: (key, payload) => {
        try {
            const payloadToJSON = JSON.stringify(payload);
            localStorage.setItem(key, payloadToJSON);
        } catch (error) {
            console.error(`Error al intentar guardar el elemento en el local storage: ${error}`);
        }
    }
};
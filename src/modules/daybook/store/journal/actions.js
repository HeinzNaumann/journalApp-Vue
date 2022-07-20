import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {

    const { data } = await journalApi.get('entries.json')
    const entries = []
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)

}


export const updateEntry = async ({ commit }, entry) => { //entry debe de ser un parametro

    const { id, text, date, picture } = entry

    const nuevosDatos = {
        date,
        text,
        picture
    }
    const texto = JSON.stringify(nuevosDatos)
    // Extraer solo lo que necesitan // -id

    await journalApi.put(`entries/${id}.json`, texto)

    // Comit de una mutación -> updateEntry
    commit('updateEntry', {...entry})
}

export const createEntry = async (/*{commit}*/) => {


}
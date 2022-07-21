import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {

    const { data } = await journalApi.get('entries.json')

    if( !data ){
        commit('setEntries', [])
        return

    }  
    console.log({data})
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

    await journalApi.put(`entries/${id}.json`, texto)

    commit('updateEntry', {...entry})
}

export const createEntry = async ({commit}, entry) => {

    const { text, date, picture} = entry

    const nuevosDatos = { text, date, picture}

    const {data} = await journalApi.post ( 'entries.json', nuevosDatos)

    entry.id = data.name

    commit('addEntry', {...entry})

    return data.name
}



export const deleteEntry = async ({commit}, id) => {

    await journalApi.delete(`entries/${id}.json`)

    commit('deleteEntry', id)
}
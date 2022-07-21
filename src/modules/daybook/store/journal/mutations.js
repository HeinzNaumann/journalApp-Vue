

export const setEntries = ( state, entries) => {
    state.entries = [ ...state.entries, ...entries]
    state.isLoading = false
}


export const updateEntry = ( state, entry ) => { // entry actualizado

    const idx = state.entries.map( e => e.id).indexOf(entry.id)
    state.entries[idx] = entry
   
}


export const addEntry = ( state, entry) => {
    console.log(state.entries)
    state.entries = [entry, ...state.entries]
   
}


export const deleteEntry = (state, id) =>{

    //remover el que coincida con este id
    state.entries = state.entries.filter(prueba => prueba.id !== id)

}
const BASE = "https://mmtareque.pythonanywhere.com/"

export const contactAPIs = {
    getContact : `${BASE}contact/list`,
    createContact : `${BASE}contact/create`,
    updateContact : `${BASE}contact/update`,
    deleteContact : `${BASE}contact/delete`,
}

export const userAPIs = {
    registration : `${BASE}users/create`,
    login : `${BASE}users/login`,
    updateProfile : `${BASE}users/update`,
    delete : `${BASE}users/delete`,
}

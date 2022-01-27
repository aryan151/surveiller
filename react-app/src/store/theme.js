const TOGGLE = 'theme/TOGGLE'
const SET_THEME = 'theme/SET_THEME'


const toggleThemeAction = (theme) => {
    return {
        type: TOGGLE,
        theme
    };
};

const setThemeAction = (theme) => {
    return {
        type: SET_THEME,
        theme
    };
};



export const toggleTheme = () => (dispatch) => {
    const curLang = localStorage.getItem('lang')
    const newLang = curLang === 'fre' ? 'eng' : 'fre'  
    localStorage.setItem('lang', newLang)
    dispatch(toggleThemeAction(newLang))
}

export const setTheme = () => (dispatch) =>{
    const isThemeInStorage = localStorage.getItem('lang')
    const lang = isThemeInStorage ? isThemeInStorage : 'eng'   
    localStorage.setItem('lang', lang)
    dispatch(setThemeAction(lang)) 
}


/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = null

const themeReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_THEME:
            newState = action.theme
            return newState
        case TOGGLE:
            newState = action.theme
            return newState
        default:
            return state
    }
}

export default themeReducer;